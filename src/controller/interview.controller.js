import fs from "fs";
import path from "path";
import { getDownloadableCSVFile } from "../../configs/exportToCsv.js";
import { ErrorHandler } from "../../utils/ErrorHandler.js";
import {
  createCsvInterviewData,
  getAllInterviewRepo,
  getSingleInterviewRepo,
  getSinglePopulatedInterviewRepo,
} from "../model/interview.repository.js";
import { interviewModel } from "../model/interview.schema.js";
import { getSingleStudentRepo } from "../model/student.repository.js";

// Get all interview listings
export const getAllInterviews = async (req, res, next) => {
  try {
    const allInterviews = await getAllInterviewRepo();
    res.render("interviews", {
      loggedIn: req.session.employee,
      allInterviews,
    });
  } catch (error) {
    return next(new ErrorHandler(500, error.message));
  }
};

// Adding a new interview listings
export const addInterview = async (req, res, next) => {
  try {
    const { interviewDate, company } = req.body;
    const interview = await getSingleInterviewRepo({
      interviewDate,
      company,
    });

    if (interview)
      return next(
        new ErrorHandler(
          400,
          "This company is already taking interview on the given date"
        )
      );
    const newInterview = await interviewModel({
      interviewDate,
      company,
    });
    await newInterview.save();
    const allInterviews = await getAllInterviewRepo();
    res.render("interviews", {
      loggedIn: req.session.employee,
      allInterviews,
    });
  } catch (error) {
    return next(new ErrorHandler(500, error.message));
  }
};

// Updating the interview result of a student
export const updateInterviewResult = async (req, res, next) => {
  try {
    const { result } = req.body;
    const { interviewId, studentId } = req.params;
    const interview = await getSingleInterviewRepo({ _id: interviewId });
    if (!interview) return next(new ErrorHandler(400, "Invalid interview Id"));
    const student = await getSingleStudentRepo({ _id: studentId });
    if (!student) return next(new ErrorHandler(400, "Invalid student Id"));

    const studentIndex = interview.studentList.findIndex(
      (obj) => obj.student.toString() == studentId
    );
    if (studentIndex == -1)
      return next(
        new ErrorHandler(
          400,
          "Can't update result because provided student id is not added in this interview list yet"
        )
      );
    interview.studentList[studentIndex].result = result;
    await interview.save();
    res.redirect(`/interview/students/${interviewId}`);
  } catch (error) {
    return next(new ErrorHandler(500, error.message));
  }
};

// Getting all the students enrolled for a particular interview
export const getInterviewStudents = async (req, res, next) => {
  try {
    const { interviewId } = req.params;
    const populatedInterview = await getSinglePopulatedInterviewRepo({
      _id: interviewId,
    });
    if (!populatedInterview)
      return next(new ErrorHandler(400, "Invalid interview Id"));

    res.render("interviewStudents", {
      loggedIn: req.session.employee,
      interview: populatedInterview,
    });
  } catch (error) {
    return next(new ErrorHandler(500, error.message));
  }
};

// Enrolling student to an interview
export const addStudentToInterview = async (req, res, next) => {
  try {
    const { interviewId } = req.params;
    const studentId = req.body.student;
    const student = await getSingleStudentRepo();
    if (!student) return next(new ErrorHandler(400, "Invalid student Id"));
    const interview = await getSingleInterviewRepo({ _id: interviewId });
    const studentIndex = interview.studentList.findIndex(
      (obj) => obj.student.toString() == studentId
    );
    if (studentIndex >= 0)
      return next(
        new ErrorHandler(400, "Student is already added for this interview")
      );

    interview.studentList.push({ student: studentId });
    await interview.save();
    res.redirect(`/interview/students/${interviewId}`);
  } catch (error) {
    return next(new ErrorHandler(500, error.message));
  }
};

// Restructing all the interview data and creating a csv file
export const createCsvDownloadFile = async (req, res, next) => {
  try {
    const allInterviews = await createCsvInterviewData();
    let data = [];
    allInterviews.forEach((obj) => {
      const doc = {
        "Student Id": obj.studentDetails[0]._id.toString(),
        "Student name": obj.studentDetails[0].name,
        "Student College": obj.studentDetails[0].college,
        "Placement Status": obj.studentDetails[0].placementStatus,
        "DSA Final Score": obj.studentDetails[0].courseScores.DSAScore,
        "WebD Final Score": obj.studentDetails[0].courseScores.WebDScore,
        "React Final Score": obj.studentDetails[0].courseScores.ReactScore,
        "Interview Date": obj.interviewDate.toString(),
        "Interview Company": obj.company,
        "Interview Result": obj.studentList.result,
      };
      data = [...data, doc];
    });
    if (data.length == 0)
      return next(new ErrorHandler(400, "No data is there"));
    const filepath = await getDownloadableCSVFile(data);
    res.download(filepath, (err) => {
      if (err) {
        console.log("Error in downloading file" + err);
      } else {
        const fsPromises = fs.promises;
        fsPromises
          .unlink(filepath)
          .then(() => {
            console.log("File is deleted");
          })
          .catch((error) => {
            console.error("Error deleting file", error);
          });
      }
    });
  } catch (error) {
    return next(new ErrorHandler(500, error.message));
  }
};

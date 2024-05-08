import { ErrorHandler } from "../../utils/ErrorHandler.js";
import {
  getAllStudentsRepo,
  getSingleStudentRepo,
} from "../model/student.repository.js";
import { studentModel } from "../model/student.schema.js";

export const getAllStudents = async (req, res, next) => {
  try {
    const allStudents = await getAllStudentsRepo();
    // console.log(allStudents);
    res.render("students", { loggedIn: req.session.employee, allStudents });
  } catch (error) {
    return next(new ErrorHandler(500, error.message));
  }
};

// Adding a new student
export const addStudent = async (req, res, next) => {
  try {
    const {
      batchName,
      name,
      email,
      college,
      placementStatus,
      DSAScore,
      WebDScore,
      ReactScore,
    } = req.body;
    let courseScores = {};
    courseScores.DSAScore = DSAScore;
    courseScores.WebDScore = WebDScore;
    courseScores.ReactScore = ReactScore;
    const student = await getSingleStudentRepo({ email });
    if (student)
      return next(
        new ErrorHandler(
          400,
          "the provided email is already associated with another student"
        )
      );
    const newStudent = new studentModel({
      batchName,
      name,
      email,
      college,
      placementStatus,
      courseScores,
    });
    await newStudent.save();
    console.log(newStudent);
    const allStudents = await getAllStudentsRepo();
    res.render("students", { loggedIn: req.session.employee, allStudents });
  } catch (error) {
    return next(new ErrorHandler(500, error.message));
  }
};

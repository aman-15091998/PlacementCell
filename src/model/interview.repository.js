import { interviewModel } from "./interview.schema.js";
export const getAllInterviewRepo = async (factor = {}) => {
  return await interviewModel.find(factor);
};
export const getSingleInterviewRepo = async (factor) => {
  return await interviewModel.findOne(factor);
};
export const getSinglePopulatedInterviewRepo = async (factor) => {
  return await interviewModel.findOne(factor).populate("studentList.student");
};

export const createCsvInterviewData = async () => {
  const allInterviews = await interviewModel.aggregate([
    { $unwind: "$studentList" },
    {
      $lookup: {
        from: "students",
        localField: "studentList.student",
        foreignField: "_id",
        as: "studentDetails",
      },
    },
  ]);
  return allInterviews;
};

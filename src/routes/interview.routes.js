import { Router } from "express";
import {
  addInterview,
  addStudentToInterview,
  createCsvDownloadFile,
  getAllInterviews,
  getInterviewStudents,
  updateInterviewResult,
} from "../controller/interview.controller.js";
import { checkAccess } from "../../middlewares/checkAccess.js";

export const interviewRoutes = Router();

interviewRoutes.get("/all", checkAccess, getAllInterviews);
interviewRoutes.post("/add", checkAccess, addInterview);
interviewRoutes.get(
  "/students/:interviewId",
  checkAccess,
  getInterviewStudents
);
interviewRoutes.post(
  "/students/:interviewId",
  checkAccess,
  addStudentToInterview
);
interviewRoutes.post(
  "/update-result/:interviewId/:studentId",
  checkAccess,
  updateInterviewResult
);
interviewRoutes.get("/export/all", checkAccess, createCsvDownloadFile);

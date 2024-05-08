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
// GET Routes
interviewRoutes.get("/all", checkAccess, getAllInterviews);
interviewRoutes.get(
  "/students/:interviewId",
  checkAccess,
  getInterviewStudents
);
interviewRoutes.get("/export/all", checkAccess, createCsvDownloadFile);
// POST Routes
interviewRoutes.post("/add", checkAccess, addInterview);

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

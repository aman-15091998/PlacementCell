import { Router } from "express";
import { checkAccess } from "../../middlewares/checkAccess.js";
import {
  addStudent,
  getAllStudents,
} from "../controller/student.controller.js";

export const studentRoutes = Router();

studentRoutes.get("/all", checkAccess, getAllStudents);
studentRoutes.post("/add", checkAccess, addStudent);

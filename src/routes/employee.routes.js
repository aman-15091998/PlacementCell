import { Router } from "express";
import {
  login,
  logout,
  renderLogin,
} from "../controller/employee.controller.js";
import { checkAccess } from "../../middlewares/checkAccess.js";

export const employeeRoutes = Router();
// GET Routes
employeeRoutes.get("/login", renderLogin);
employeeRoutes.get("/logout", checkAccess, logout);
// POST Routes
employeeRoutes.post("/login", login);

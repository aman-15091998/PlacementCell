import { Router } from "express";
import {
  login,
  logout,
  renderLogin,
} from "../controller/employee.controller.js";
import { checkAccess } from "../../middlewares/checkAccess.js";

export const employeeRoutes = Router();
employeeRoutes.get("/login", renderLogin);
employeeRoutes.post("/login", login);
employeeRoutes.get("/logout", checkAccess, logout);

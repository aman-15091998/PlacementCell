import jwt from "jsonwebtoken";
import { ErrorHandler } from "../../utils/ErrorHandler.js";
import { getEmployeeRepo } from "../model/employee.repository.js";

export const renderLogin = (req, res, next) => {
  res.render("login", { loggedIn: req.session.employee });
};
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return next(new ErrorHandler(400, "Both email and password is required"));
    const employee = await getEmployeeRepo({ email, password });
    if (!employee) return next(new ErrorHandler(400, "Incorrect credentials"));
    req.session.employee = employee;
    res.render("login", {
      loggedIn: req.session.employee,
      message: "Logged in successfully",
    });
  } catch (error) {
    return next(new ErrorHandler(500, error.message));
  }
};

export const logout = async (req, res, next) => {
  try {
    res.clearCookie("jwt");
    req.session.destroy();
    res.clearCookie("connect.sid");
    res.render("index", {
      loggedIn: req.session,
      message: "Logged out successfully",
    });
  } catch (error) {
    return next(new ErrorHandler(500, error.message));
  }
};

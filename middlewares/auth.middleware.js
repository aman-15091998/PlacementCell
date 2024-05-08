import jwt from "jsonwebtoken";
import { ErrorHandler } from "../utils/ErrorHandler.js";
export const auth = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) return next(new ErrorHandler(400, "Please login to continue"));

    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
      if (err) return next(new ErrorHandler(400, "Invalid Token"));
      else req.id = payload.id;
    });
    next();
  } catch (error) {
    return next(new ErrorHandler(500, error.message));
  }
};

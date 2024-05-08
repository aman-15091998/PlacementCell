import mongoose from "mongoose";
import { employeesModel } from "./employee.schema.js";

export const getEmployeeRepo = async (factor) => {
  return await employeesModel.findOne(factor);
};

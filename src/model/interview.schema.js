import mongoose, { Schema } from "mongoose";

const interviewSchema = mongoose.Schema({
  interviewDate: {
    type: Date,
    required: true,
  },
  studentList: [
    {
      student: {
        type: Schema.Types.ObjectId,
        ref: "Student",
        required: true,
      },
      result: {
        type: String,
        enum: ["On Hold", "PASS", "FAIL", "Didn't Attempt"],
      },
    },
  ],
  company: {
    type: String,
    required: true,
  },
});

export const interviewModel = mongoose.model("Interview", interviewSchema);

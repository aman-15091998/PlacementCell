import mongoose from "mongoose";

const studentSchema = mongoose.Schema({
  batchName: { type: String, required: true },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  college: {
    type: String,
    required: true,
  },
  placementStatus: {
    type: String,
    enum: ["placed", "notPlaced"],
    required: true,
  },
  courseScores: {
    DSAScore: { type: Number, required: true, default: 0 },
    WebDScore: { type: Number, required: true, default: 0 },
    ReactScore: { type: Number, required: true, default: 0 },
  },
});

export const studentModel = mongoose.model("Student", studentSchema);

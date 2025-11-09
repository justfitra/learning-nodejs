import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    age: { type: Number, required: true },
    study_programs: { type: String, required: true },
    faculty: { type: String },
  },
  { timestamps: true }
);

export const Student = mongoose.model("Student", studentSchema);

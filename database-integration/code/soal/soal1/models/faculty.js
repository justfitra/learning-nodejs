import mongoose from "mongoose";

const facultySchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    students: { type: Array, ref: "Student" },
  },
  { timestamp: true }
);

export const Faculty = mongoose.model("Faculty", facultySchema);

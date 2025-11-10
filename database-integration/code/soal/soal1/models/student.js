import mongoose, { Schema } from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    age: { type: Number, required: true },
    faculty: { type: Schema.Types.ObjectId, ref: "Faculty", required: true },
  },
  { timestamps: true }
);

export const Student = mongoose.model("Student", studentSchema);

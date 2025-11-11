import mongoose from "mongoose";

const facultySchema = mongoose.Schema(
  {
    name: { type: String, required: true },
  },
  { timestamp: true }
);

facultySchema.virtual("student", {
  ref: "Student",
  localField: "_id",
  foreignField: "faculty",
});

facultySchema.virtual("major", {
  ref: "Major",
  localField: "_id",
  foreignField: "faculty",
});

facultySchema.set("toJSON", { virtuals: true });
facultySchema.set("toObject", { virtuals: true });
export const Faculty = mongoose.model("Faculty", facultySchema);

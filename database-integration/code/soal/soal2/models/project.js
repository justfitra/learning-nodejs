import mongoose from "mongoose";

const projectSchema = mongoose.Schema(
  {
    name: { type: String },
  },
  {
    timestamp: true,
  }
);

export const Project = mongoose.model("Project", projectSchema);

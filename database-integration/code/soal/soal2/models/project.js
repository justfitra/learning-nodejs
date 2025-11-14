import mongoose, { Schema } from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    name: { type: String },
    deadline: { type: Date },
    worker: [{ type: Schema.Types.ObjectId, ref: "Worker" }],
  },
  {
    timestamp: true,
  }
);

export const Project = mongoose.model("Project", projectSchema);

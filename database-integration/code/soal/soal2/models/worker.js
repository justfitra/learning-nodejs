import mongoose, { Schema } from "mongoose";

const workerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    age: { type: Number },
    position: { type: String },
    salary: { type: Number },
    departement: { type: Schema.Types.ObjectId, ref: "Departement" },
    project: [{ type: Schema.Types.ObjectId, ref: "Project" }],
  },
  {
    timestamps: true,
  }
);

export const Worker = mongoose.model("Worker", workerSchema);

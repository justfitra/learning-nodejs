import mongoose, { Schema } from "mongoose";

const workerSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    age: { type: Number },
    departement: { type: Schema.type.ObjectId, ref: "Departement" },
  },
  {
    timestamps: true,
  }
);

export const Worker = mongoose.model("Worker", workerSchema);

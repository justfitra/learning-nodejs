// import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const departementSchema = new mongoose.Schema(
  {
    name: { type: String },
    location: { type: String },
  },
  { timestamps: true }
);

departementSchema.virtual("departement", {
  ref: "Worker",
  localField: "_id",
  foreignField: "departement",
});

export const Departement = mongoose.model("Departement", departementSchema);

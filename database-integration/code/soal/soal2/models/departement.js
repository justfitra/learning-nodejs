// import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const departementSchema = new mongoose.Schema(
  {
    name: { type: String },
    location: { type: String },
  },
  { timestamps: true }
);

departementSchema.virtual("worker", {
  ref: "Worker",
  localField: "_id",
  foreignField: "departement",
});

departementSchema.set("toJSON", { virtuals: true });
departementSchema.set("toObject", { virtuals: true });

export const Departement = mongoose.model("Departement", departementSchema);

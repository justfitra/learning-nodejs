import mongoose, { Schema } from "mongoose";

const majorSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    faculty: { type: Schema.Types.ObjectId, ref: "Faculty" },
  },
  {
    timestamp: true,
  }
);

export const Major = mongoose.model("Major", majorSchema);

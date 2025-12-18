import mongoose, { Schema } from "mongoose";

const refreshTokenSchema = new mongoose.Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    token: { type: String },
  },
  {
    timestamps: true,
  }
);

export const RefreshToken = mongoose.model("RefreshToken", refreshTokenSchema);

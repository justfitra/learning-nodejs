import mongoose, { Schema } from "mongoose";

const refreshTokenSchema = new mongoose.Schema(
  {
    userId: { type: Schema.Types.ObjectId, required: true },
    token: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const RefreshToken = mongoose.model("RefreshToken", refreshTokenSchema);

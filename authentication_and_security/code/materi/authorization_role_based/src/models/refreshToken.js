import mongoose, { Schema } from "mongoose";

const refreshTokenSchema = new mongoose.Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    token: { type: String, requried: true },
  },
  {
    timestamps: true,
  }
);

export const RefreshToken = mongoose.model("RefreshToken", refreshTokenSchema);

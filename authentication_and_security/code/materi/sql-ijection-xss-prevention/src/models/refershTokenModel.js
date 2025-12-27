import mongoose, { Schema } from "mongoose";

const refershTokenSchema = new mongoose.Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    token: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const RefershToken = mongoose.model("RefreshToken", refershTokenSchema);

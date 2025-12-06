import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    balance: { type: Number },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", userSchema);

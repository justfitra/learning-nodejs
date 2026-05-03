import mongoose, { mongo } from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

export const User = mongoose.model("User", userSchema);

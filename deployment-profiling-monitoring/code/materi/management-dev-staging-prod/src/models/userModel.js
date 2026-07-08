import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, max: 255 },
    email: { type: String, required: true },
    password: { type: String, required: true },
    avatar: { type: String },
    role: {
      type: String,
      required: true,
      enum: ["admin", "user"],
      default: "user",
    },
  },
  {
    timestamps: true,
  },
);

export const User = mongoose.model("Users", userSchema);

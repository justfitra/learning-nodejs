import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    role: {
      type: String,
      enum: ["user", "admin", "superadmin"],
      default: "user",
    },
    password: { type: String, require: true },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);

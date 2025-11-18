import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    age: { type: Number },
    password: { type: String, required: true,has },
    website: { type: String },
    bio: { type: String },
  },
  {
    timestamp: true,
  }
);

export const User = mongoose.model("User", userSchema);

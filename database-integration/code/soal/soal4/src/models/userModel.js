import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, min: 3 },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  bio: { type: String, max: 200 },
  balance: { type: Number },
  phone: { type: Number },
});

export const User = mongoose.model("User", userSchema);

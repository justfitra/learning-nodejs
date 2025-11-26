import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, min: 3, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
    required: true,
  },
  age: { type: Number },
  address: { type: String },
  street: { type: String },
  city: { type: String },
});

export const User = mongoose.model("User", userSchema);

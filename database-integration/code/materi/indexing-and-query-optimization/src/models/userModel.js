import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, index: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

userSchema.index({ age: 1, name: 1 });

export const User = mongoose.model("User", userSchema);

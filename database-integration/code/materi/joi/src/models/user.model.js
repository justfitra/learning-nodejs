import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    age: { type: Number, min: 18, max: 60 },
  },
  { timestamp: true }
);

export default User = mongoose.model("User", userSchema);

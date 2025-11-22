import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";

export const createUserServce = async (payload) => {
  const existingEmail = await User.findOne({ email: payload.email });

  if (existingEmail) {
    const error = new Error("Email already exist");
    error.status = 409;
    throw error;
  }

  const hashedPassword = await bcrypt.hash(payload.password, 10);

  const user = await User.create({
    ...payload,
    email: payload.email,
    password: hashedPassword,
  });

  return {
    id: user._id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
  };
};

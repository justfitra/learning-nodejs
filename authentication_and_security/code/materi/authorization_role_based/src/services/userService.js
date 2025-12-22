import { User } from "../models/userModel.js";
import { AppError } from "../utils/appError.js";
import { hashPassword } from "../utils/password.js";

export const create = async (payload) => {
  const existingUser = User.findOne({ email: payload.email });
  if (existingUser) {
    throw new AppError("User Already exist", 400);
  }
  const password = hashPassword(payload.password);
  const user = await User.create({ ...payload, password: password });

  return {
    name: user.name,
    email: user.email,
    role: user.role,
  };
};

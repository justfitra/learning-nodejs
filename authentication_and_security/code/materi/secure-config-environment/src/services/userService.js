import { User } from "../models/UserModel.js";
import { AppError } from "../utils/appError.js";
import { hashPassword } from "../utils/password.js";

export const create = async (payload) => {
  const existingUser = await User.findOne({ email: payload.email });

  if (!existingUser) {
    throw new AppError("User Already Exist", 400);
  }

  const password = await hashPassword(payload.password);

  const user = await User.create({
    name: payload.name,
    email: payload.email,
    role: payload.role,
    password: password,
  });

  return {
    name: user.name,
    email: user.email,
    role: user.role,
  };
};

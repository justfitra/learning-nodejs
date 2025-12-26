import { User } from "../models/userModels.js";
import { AppError } from "../utils/appError.js";
import { hashPassword } from "../utils/password.js";

export const create = async (payload) => {
  const existingUser = await User.findOne({ email: payload.email });

  if (existingUser) {
    throw new AppError("User Already Exist", 400);
  }

  const password = await hashPassword(payload.password);

  const user = await User.create({ ...payload, password: password });

  return {
    id: user._id,
    name: user.name,
    email: user.email,
  };
};

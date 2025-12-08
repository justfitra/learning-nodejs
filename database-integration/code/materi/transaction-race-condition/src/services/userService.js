import { User } from "../models/userModel.js";
import { AppError } from "../utils/appError.js";

export const create = async (payload) => {
  const emailCheck = await User.findOne({ email: payload.email });

  if (emailCheck) {
    throw new AppError("Email already use", 400);
  }

  const user = await User.create({
    ...payload,
  });

  return {
    name: user.name,
    email: user.email,
    balance: user.balance,
  };
};

export const get = async () => {
  const users = await User.find({}).select("name email balance");
  if (!users || users.length === 0) {
    throw new AppError("User not found", 404);
  }
  return users;
};

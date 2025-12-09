import { User } from "../models/userModel.js";
import { AppError } from "../utils/AppError.js";
import bcrypt from "bcrypt";

export const create = async (payload) => {
  const existingEmail = await User.findOne({ email: payload.email });
  if (existingEmail) {
    throw new AppError("Email already used", 400);
  }
  const hasedPassword = await bcrypt.hash(payload.password, 9);

  const user = await User.create({ payload, password: hasedPassword });

  return {
    name: user.name,
    email: user.email,
    balance: user.balance,
  };
};

export const get = async () => {
  const users = await User.find({}).select("name email balance");
  if (users.length === 0 || !users) {
    throw new AppError("User Not Found", 404);
  }
  return users;
};

import { User } from "../models/userModel.js";
import { AppError } from "../utils/appError.js";

export const create = async (payload) => {
  const existingEmail = await User.findOne({ email: payload.email });
  if (existingEmail) {
    throw new AppError("Email Already Exist", 400);
  }
  const user = await User.create(payload);

  return user;
};

export const get = async () => {
  const users = await User.find({ age: 20 }).explain();

  return users;
};

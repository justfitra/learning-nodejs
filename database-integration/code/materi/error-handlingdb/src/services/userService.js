import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";
import { AppError } from "../utils/appError.js";

export const create = async (payload) => {
  const existingEmail = await User.findOne({ email: payload.email });
  if (existingEmail) {
    throw new AppError("Email already exist", 409);
  }

  const hashedPassword = await bcrypt.hash(payload.password, 8);

  const user = await User.create({
    ...payload,
    password: hashedPassword,
  });

  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
};

export const get = async () => {
  const users = await User.find({}).select("id name email");
  if (!users || users.length === 0) {
    const error = Error("User Not found");
    error.code = 404;
    throw error;
  }
  return users;
};

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
    const error = new AppError("User Not found", 404);
    throw error;
  }
  return users;
};

export const update = async (username, payload) => {
  if (payload.email) {
    const error = new AppError("Email Tidak bisa di update", 400);
    throw error;
  }
  let hashedPassword;
  if (payload.password) {
    hashedPassword = await bcrypt.hash(payload.password, 8);
  }
  hashedPassword = payload.password;
  const user = await User.findOneAndUpdate(
    { username: username },
    { name: payload.name, password: hashedPassword },
    {
      new: true,
      runValidators: true,
    }
  );

  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
};

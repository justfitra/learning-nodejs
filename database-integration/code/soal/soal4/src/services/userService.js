import { User } from "../models/userModel.js";
import { AppError } from "../utils/appError.js";
import bcrypt from "bcrypt";

export const create = async (payload) => {
  const existingUser = await User.findOne({ email: payload.email });

  if (existingUser) {
    throw new AppError("email already exits", 400);
  }

  const hashPassword = await bcrypt.hash(payload.password, 10);

  const user = await User.create({ ...payload, password: hashPassword });
  return {
    email: user.email,
    age: user.age,
    role: user.role,
    age: user.age,
    address: user.address,
    street: user.street,
    city: user.city,
  };
};

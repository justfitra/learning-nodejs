import { User } from "../models/userModel.js";
import { hashPassword } from "../utils/password.js";

export const create = async (payload) => {
  const existUser = await User.findOne({ email: payload.email });

  if (existUser) {
    throw new AppError("User Already Exist", 400);
  }

  const password = await hashPassword(payload.password);

  const confirmPassword = await comparePassword(
    payload.confirmPassword,
    password,
  );

  if (!confirmPassword) {
    throw new AppError("Please Confirm Your Password", 400);
  }

  const user = await User.create({ ...payload, password: password });

  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
};

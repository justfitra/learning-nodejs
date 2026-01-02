import { User } from "../models/UserModel.js";
import { AppError } from "../utils/appError.js";

export const create = async (payload) => {
  const existingUser = await User.findOne({ email: payload.email });

  if (!existingUser) {
    throw new AppError("User Already Exist", 400);
  }
};

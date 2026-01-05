import { User } from "../models/UserModel";
import { AppError } from "../utils/appError";
import { comparePassword } from "../utils/password";

export const login = async (payload) => {
  const user = await User.findOne({ email: payload.email });

  if (!user) {
    throw new AppError("Invalid Email", 401);
  }

  const validatePassword = await comparePassword(
    payload.password,
    user.password
  );

  if (!validatePassword) {
    throw new AppError("Invalid Password", 401);
  }
};

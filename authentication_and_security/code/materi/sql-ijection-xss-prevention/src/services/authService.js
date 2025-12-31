import { RefershToken } from "../models/refershTokenModel.js";
import { User } from "../models/userModels.js";
import { AppError } from "../utils/appError.js";
import { comparePassword } from "../utils/password.js";
import { generateAccessToken, generateRefershToken } from "../utils/token.js";

export const login = async (payload) => {
  const user = await User.findOne({ email: payload.email });

  if (!user || user.length === 0) {
    throw new AppError("Invalid Email or Password");
  }

  const validatePassword = await comparePassword(
    payload.password,
    user.password
  );

  if (!validatePassword) {
    throw new AppError("Invalid Email or Password");
  }

  const accessToken = generateAccessToken({
    userId: user._id,
    role: user._role,
  });

  const refershToken = generateRefershToken({
    userId: user._id,
  });

  await RefershToken.create({
    userId: user._id,
    token: refershToken,
  });

  return { accessToken, refershToken };
};

import { RefreshToken } from "../models/refreshTokenModel.js";
import { User } from "../models/userModel.js";
import { AppError } from "../utils/appError.js";
import { comparePassword, hashPassword } from "../utils/password.js";
import { generateAccessToken, generateRefreshToken } from "../utils/token.js";

export const create = async (payload) => {
  const existingEmail = await User.findOne({ name: payload.name });

  if (existingEmail) {
    throw new AppError("User Already Exists", 400);
  }

  const password = await hashPassword(payload.password);

  const user = await User.create({ ...payload, password: password });

  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
};

export const login = async (payload) => {
  const user = await User.findOne({ email: payload.email });

  if (!user) {
    throw new AppError("Invalid Email or Password", 400);
  }

  const isMatch = await comparePassword(payload.password, user.password);

  if (!isMatch) {
    throw new AppError("Invalid Email or Password", 400);
  }

  await RefreshToken.deleteMany({ userId: user._id });

  const accessToken = generateAccessToken({ userId: user._id });
  const refreshToken = generateRefreshToken({
    userId: user._id,
  });

  await RefreshToken.create({
    userId: user._id,
    token: refreshToken,
  });

  return { accessToken, refreshToken };
};

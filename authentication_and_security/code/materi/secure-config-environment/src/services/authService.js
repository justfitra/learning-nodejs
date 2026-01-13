import { RefreshToken } from "../models/refreshTokenModel.js";
import { User } from "../models/UserModel.js";
import { AppError } from "../utils/appError.js";
import { comparePassword, hashPassword } from "../utils/password.js";
import { generateAccessToken, generateRefreshToken } from "../utils/token.js";

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

  const accessToken = generateAccessToken({
    userId: user._id,
    role: user.role,
  });

  const refreshToken = generateRefreshToken({
    userId: user._id,
  });

  await RefreshToken.create({
    userId: user._id,
    token: refreshToken,
  });
  return {
    accessToken,
    refreshToken,
  };
};

export const register = async (payload) => {
  const existUser = await User.findOne({ email: payload.email });

  if (existUser) {
    throw new AppError("Email Already Exist", 401);
  }

  const password = await hashPassword(payload.password);

  const confirmPassword = await comparePassword(
    payload.confirmPassword,
    password
  );

  if (!confirmPassword) {
    throw new AppError("You must be input same password", 401);
  }
  const user = await User.create({ ...payload, password: password });

  const accessToken = generateAccessToken({
    userId: user._id,
    role: user.role,
  });

  const refreshToken = generateRefreshToken({
    userId: user._id,
  });

  await RefreshToken.create({
    userId: user.id,
    token: refreshToken,
  });

  return {
    accessToken,
    refreshToken,
  };
};

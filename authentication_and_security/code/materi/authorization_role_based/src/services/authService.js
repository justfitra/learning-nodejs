import { RefreshToken } from "../models/refreshToken.js";
import { User } from "../models/userModel.js";
import { AppError } from "../utils/appError.js";
import { comparePassword } from "../utils/password.js";
import { generateAccessToken, generateRefreshToken } from "../utils/token.js";

export const login = async (payload) => {
  const user = await User.findOne({ email: payload.email });
  if (!user || user.length === 0) {
    throw new AppError("Invalid email or password", 401);
  }
  const validatePassword = comparePassword(payload.password, user.password);

  if (!validatePassword) {
    throw new AppError("Invalid email or password", 401);
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

  return { accessToken, refreshToken };
};

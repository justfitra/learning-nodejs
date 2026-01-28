import { RefereshToken } from "../models/refreshToken.js";
import { User } from "../models/userModel.js";
import { AppError } from "../utils/appError.js";
import { comparePassword, hashPassword } from "../utils/password.js";
import { generateAccessToken, genreteRefreshToken } from "../utils/token.js";

export const login = async (payload) => {
  const user = await User.findOne({ email: payload.email });

  if (!user) {
    throw new AppError("Email or Password wrong", 401);
  }

  const validatePassword = await comparePassword(
    payload.password,
    user.password,
  );

  if (!validatePassword) {
    throw new AppError("Email or Password wrong", 401);
  }

  const session = (req.session.user = {
    id: user._id,
    role: user.role,
  });

  return {
    session,
  };
};

export const register = async (payload) => {
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

  const accessToken = generateAccessToken({
    userId: user._id,
    role: user.role,
  });

  const refreshToken = genreteRefreshToken({ userId: user._id });

  await RefereshToken.create({ userId: user._id, token: refreshToken });

  return {
    accessToken,
    refreshToken,
  };
};

export const logout = async (session) => {
  session.destroy((err) => {
    if (err) {
      throw new AppError("Logout Failed", 500);
    }
  });

  res.clearCookie("sid");
};

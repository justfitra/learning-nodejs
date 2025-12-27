import { RefershToken } from "../models/refershTokenModel.js";
import { User } from "../models/userModels.js";
import { AppError } from "../utils/appError.js";
import { hashPassword } from "../utils/password.js";
import { generateAccessToken, generateRefershToken } from "../utils/token.js";

export const create = async (payload) => {
  const existingUser = await User.findOne({ email: payload.email });

  if (existingUser) {
    throw new AppError("User Already Exist", 400);
  }

  const password = await hashPassword(payload.password);

  const user = await User.create({ ...payload, password: password });

  const accessToken = generateAccessToken({
    userId: user._id,
    role: user.role,
  });

  const refershToken = generateRefershToken({
    userId: user._id,
  });

  await RefershToken.create({ userId: user._id, token: refershToken });

  return {
    id: user._id,
    name: user.name,
    email: user.email,
    accessToken: accessToken,
    refershToken: refershToken,
  };
};

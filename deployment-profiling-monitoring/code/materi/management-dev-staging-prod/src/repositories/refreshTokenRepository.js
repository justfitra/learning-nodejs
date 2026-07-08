import { RefreshToken } from "../models/refreshTokenModel.js";

const create = async (userId, token) => {
  const refreshToken = await RefreshToken.create({
    userId: userId,
    token: token,
  });

  return refreshToken;
};

export { create };

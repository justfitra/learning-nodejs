import { RefreshToken } from "../models/refreshTokenModel.js";

const create = async (id, token) => {
  const refreshToken = await RefreshToken.create({
    userId: id,
    token: token,
  });

  return refreshToken;
};

export { create };

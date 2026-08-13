import * as authService from "../services/authService.js";
import * as refreshTokenRepository from "../repositories/refreshTokenRepository.js";
import { formatResponse } from "../utils/formatResponse.js";

export const createLogin = async (req, res, next) => {
  try {
    const response = await authService.login(refreshTokenRepository, req.body);

    return res.status(200).json(formatResponse(200, "Success", response));
  } catch (err) {
    next(err);
  }
};

export const createRegister = async (req, res, next) => {
  try {
    const response = await authService.register(
      refreshTokenRepository,
      req.body,
    );

    return res
      .status(201)
      .json(formatResponse(201, "Register Success", response));
  } catch (err) {
    next(err);
  }
};

import * as authService from "../services/authService.js";
import { formatResponse } from "../utils/formatResponse.js";

export const authLogin = async (req, res, next) => {
  try {
    const response = await authService.login(req.body, req.session);

    return res.status(200).json(formatResponse(200, "Success", response));
  } catch (err) {
    next(err);
  }
};

export const authRegister = async (req, res, next) => {
  try {
    const response = await authService.register(req.body);

    return res.status(200).json(formatResponse(200, "Success", response));
  } catch (err) {
    next(err);
  }
};

export const authLogout = async (req, res, next) => {
  try {
    await authService.logout(req.session);

    res.clearCookie("sid");
    return res.status(200).json(formatResponse(200, "Success"));
  } catch (err) {
    next(err);
  }
};

import * as userService from "../services/userService.js";
import { formatResponse } from "../utils/formatResponse.js";

export const createUser = async (req, res, next) => {
  try {
    const user = await userService.create(req.body);

    return res.status(201).json(formatResponse(201, "Success", user));
  } catch (err) {
    next(err);
  }
};

export const getUser = async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
};

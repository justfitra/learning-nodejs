import { formatResponse } from "../utils/formatResponse.js";
import * as userService from "../services/userService.js";

export const createUser = async (req, res, next) => {
  try {
    const user = await userService.create(req.body);

    res
      .status(201)
      .json(formatResponse(201, "User Created Successfully", user));
  } catch (err) {
    next(err);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await userService.get();

    res
      .status(201)
      .json(formatResponse(201, "User Created Successfully", user));
  } catch (err) {
    next(formatResponse(500, err));
  }
};

import * as userService from "../services/userService.js";
import { formatResponse } from "../utils/formatResponse.js";

export const createUser = async (req, res, next) => {
  try {
    const user = await userService.create(req.body);

    return res
      .status(201)
      .json(formatResponse(201, "User Created Successfully", user));
  } catch (err) {
    next(err);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const users = await userService.get();

    return res
      .status(200)
      .json(formatResponse(200, "User Get Succesfully", users));
  } catch (err) {
    next(err);
  }
};

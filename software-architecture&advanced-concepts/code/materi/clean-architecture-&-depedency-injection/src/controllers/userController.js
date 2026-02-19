import * as userService from "../services/userService.js";
import * as userRepository from "../repositories/userRepository.js";
import { formatResponse } from "../utils/formatResponse.js";

export const get = async (req, res, next) => {
  try {
    const users = await userService.get(userRepository, req.params.id);

    res.status(200).json(formatResponse(200, "Success", users));
  } catch (err) {
    next(err);
  }
};

export const create = async (req, res, next) => {
  try {
    const users = await userService.create(userRepository, req.body);

    res.status(201).json(formatResponse(201, "Success", users));
  } catch (err) {
    next(err);
  }
};

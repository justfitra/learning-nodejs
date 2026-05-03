import * as userService from "../services/userService.js";
import * as userRepository from "../repositories/userRepository.js";
import { formatResponse } from "../utils/formatResponse.js";

const get = async (req, res, next) => {
  try {
    const user = await userService.get(userRepository, req.params.id);
    res.status(200).json(formatResponse(200, "Success", user));
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    await userService.create(userRepository, req);
    res.status(200).json(formatResponse(201, "Success"));
  } catch (err) {
    next(err);
  }
};

export { get, create };

import * as userService from "../services/userService.js";
import * as userRepository from "../repositories/userRepository.js";
import { formatResponse } from "../utils/formatResponse.js";

const get = async (req, res, next) => {
  try {
    const users = await userService.get(userRepository);

    return res.status(200).json(formatResponse(200, "Success", users));
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    const user = await userService.create(userRepository, req);

    return res.status(201).json(formatResponse(200, "Success"));
  } catch (err) {
    next(err);
  }
};

const show = async (req, res, next) => {
  try {
    const user = await userService.show(userRepository);

    return res.status(200).json(formatResponse(200, "Success", user));
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const user = await userService.update(userRepository);

    return res.status(201).json(formatResponse(201, "Success"));
  } catch (err) {
    next(err);
  }
};

const del = async (req, res, next) => {
  try {
    const user = await userService.del(userRepository);

    return res.status(200).json(formatResponse(200, "Success"));
  } catch (err) {
    next(err);
  }
};

export { get, create, show, update, del };

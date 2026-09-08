import * as userService from "../services/userService.js";
import * as userRepository from "../repositories/userRepository.js";
import { formatResponse } from "../utils/formatResponse.js";

const create = async (req, res, next) => {
  try {
    const user = await userService.create(userRepository, req.body);

    return res.status(201).json(formatResponse(201, "Success", user));
  } catch (err) {
    next(err);
  }
};

const get = async (req, res, next) => {
  try {
    const users = await userService.get(userRepository);

    return res.status(201).json(formatResponse(201, "Success", users));
  } catch (err) {
    next(err);
  }
};

const show = async (req, res, next) => {
  try {
    const user = await userService.show(userRepository, req.params.name);

    return res.status(201).json(formatResponse(201, "Success", user));
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const user = await userService.update(
      userRepository,
      req.body,
      req.params.name,
    );

    return res.status(201).json(formatResponse(201, "Success", user));
  } catch (err) {
    next(err);
  }
};

const del = async (req, res, next) => {
  try {
    const user = await userService.del(userRepository, req.params.name);

    return res.status(201).json(formatResponse(201, "Success", user));
  } catch (err) {
    next(err);
  }
};

export { create, get, show, update, del };

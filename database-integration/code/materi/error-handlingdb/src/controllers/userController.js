import { formatResponse } from "../utils/formatResponse.js";
import * as userService from "../services/userService.js";
import { User } from "../models/userModel.js";

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

    res.status(200).json(formatResponse(200, "Success get all users", user));
  } catch (err) {
    next(err);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const user = await userService.update(req.params.username, req.body);

    res
      .status(200)
      .json(formatResponse(200, "User Updated Successfully", user));
  } catch (err) {
    next(err);
  }
};

export const showUser = async (req, res, next) => {
  try {
    const user = await User.find({ name: req.params.name });

    res.status(200).json(formatResponse(200, "Success get detail user", user));
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    await User.findOneAndDelete({ name: req.params.name });

    res.status(200).json(formatResponse(200, "User Successfully Deleted"));
  } catch (err) {
    next(err);
  }
};

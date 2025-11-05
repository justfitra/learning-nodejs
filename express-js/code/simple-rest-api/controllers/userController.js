import { get, post } from "../services/userService.js";
import { formatResponse } from "../utils/formatResponse.js";

export const getUsers = (req, res, next) => {
  try {
    const users = get();

    res
      .status(200)
      .json(formatResponse(200, "Get All Users Successfully", users));
  } catch (err) {
    next(err);
  }
};

export const createUser = (req, res, next) => {
  try {
    const username = req.body.username;
    const age = req.body.age;
    const password = req.body.password;

    const user = post(username, age, password);

    res
      .status(201)
      .json(formatResponse(201, "User Successfully Created", user));
  } catch (err) {
    next(err);
  }
};

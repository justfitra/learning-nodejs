import * as userService from "../services/userService.js";
import { formatResposnse } from "../utils/formatResponse.js";

const create = async (req, res, next) => {
  try {
    const user = await userService.create(req.body);

    return res
      .status(201)
      .json(formatResposnse(201, "User Successfully Created", user));
  } catch (err) {
    next(err);
  }
};

const get = async (req, res, next) => {
  try {
    const users = await userService.get();

    return res
      .status(200)
      .json(formatResposnse(200, "User Successfully Getted", users));
  } catch (err) {
    next(err);
  }
};
export { create, get };

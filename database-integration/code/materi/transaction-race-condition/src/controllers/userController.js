import * as userService from "../services/userService.js";

const create = async (req, res, next) => {
  try {
    const user = await userService.create(req.body);

    return res.status(201).json({ data: user });
  } catch (err) {
    next(err);
  }
};

const get = async (req, res, next) => {
  try {
    const users = await userService.get();

    return res.status(200).json({ data: users });
  } catch (err) {
    next(err);
  }
};
export { create, get };

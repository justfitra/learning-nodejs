import path from "path";
import { AppError } from "../utils/appError.js";
import { hashPassword } from "../utils/hashPassword.js";
import fs from "fs";

const get = async (repository, id) => {
  try {
    const user = await repository.get(id);

    return user;
  } catch (err) {
    throw new AppError(err.message);
  }
};

const create = async (repository, payload) => {
  try {
    const name = payload.body.name;
    const password = await hashPassword(payload.body.password);

    const user = await repository.create({
      name: name,
      password: password,
      image: payload.file.filename,
    });

    return user;
  } catch (err) {
    throw new AppError(err.message);
  }
};
export { get, create };

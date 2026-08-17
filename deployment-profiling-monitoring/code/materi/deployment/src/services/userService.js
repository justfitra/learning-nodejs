import { AppError } from "../utils/appError";

const get = async (repository) => {
  try {
    const users = await repository.get();

    return users;
  } catch (err) {
    throw new AppError(err.message, err.status);
  }
};

const create = async (repository, payload) => {
  try {
    const user = await repository.create();

    return user;
  } catch (err) {
    throw new AppError(err.message, err.status);
  }
};

import { AppError } from "../utils/appError.js";

const get = async (repository) => {
  try {
    const posts = await repository.get();

    return posts;
  } catch (err) {
    throw new AppError(err.message);
  }
};

const create = async (repository, payload) => {
  try {
    const post = await repository.create({
      title: payload.body.title,
      image: payload.files.filename,
    });

    return post;
  } catch (err) {
    throw new AppError(err.message);
  }
};

export { get, create };

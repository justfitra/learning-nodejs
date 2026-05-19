import { AppError } from "../utils/appError.js";
import {
  deletePostCache,
  getPostCache,
  setPostCache,
} from "../cache/postCache.js";

const get = async (repository) => {
  try {
    const cached = await getPostCache();

    if (cached) {
      console.log("Data from Redis");
      return cached;
    }

    const posts = await repository.get();
    await setPostCache(posts);

    console.log("Data from Mongo DB");

    return posts;
  } catch (err) {
    throw new AppError(err.message);
  }
};

const create = async (repository, payload) => {
  try {
    const post = await repository.create({
      ...payload.body,
      image: payload.file.filename,
    });

    await deletePostCache();

    return post;
  } catch (err) {
    throw new AppError(err.message);
  }
};

export { get, create };

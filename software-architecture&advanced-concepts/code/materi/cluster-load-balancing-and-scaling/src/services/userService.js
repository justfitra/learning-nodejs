import path from "path";
import {
  deleteUserCache,
  getUserCache,
  setUserCache,
} from "../cache/userCache.js";
import logger from "../config/logger.js";
import { User } from "../models/userModel.js";
import { AppError } from "../utils/appError.js";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const get = async (repository) => {
  try {
    const cached = await getUserCache();

    if (cached) {
      return cached;
    }

    const users = await repository.get();
    await setUserCache(users);

    logger.info("Get all data");
    return users;
  } catch (err) {
    logger.error(err.message);
    throw new AppError(err.message, err.status);
  }
};

const create = async (repository, payload) => {
  try {
    const user = await repository.create({
      ...payload.body,
      avatar: payload.file.filename,
    });

    await deleteUserCache();

    logger.info("Creating new user");

    return user;
  } catch (err) {
    logger.error(err.message);
    throw new AppError(err.message, err.status);
  }
};

const show = async (repository, name) => {
  try {
    const cached = await getUserCache();

    if (cached) {
      return cached;
    }
    const user = await repository.show(name);
    await setUserCache(user);
    logger.info("Get spesific user");

    return user;
  } catch (err) {
    logger.error(err.message);
    throw new AppError(err.message, err.status);
  }
};

const update = async (repository, payload, name) => {
  try {
    const user = await User.findOne({ name: name });

    if (!user) throw new AppError("Product not found", 404);

    let imgPath = user.avatar;

    if (payload.file) {
      if (user.avatar) {
        const oldPath = path.join(__dirname, "../uploads", user.avatar);

        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }
      imgPath = payload.file.filename;
    }

    const updated = await repository.update(name, {
      ...payload.body,
      avatar: imgPath,
    });

    await deleteUserCache();
    logger.info("Update user");
    return updated;
  } catch (err) {
    logger.error(err.message);
    throw new AppError(err.message, err.status);
  }
};

const del = async (repository, name) => {
  try {
    const user = await User.findOne({ name: name });

    if (user.avatar) {
      const imgPath = path.join(__dirname, "../uploads", user.avatar);
      fs.unlinkSync(imgPath);
    }
    await repository.del(name);
    logger.info("Delete user");
    return "Success";
  } catch (err) {
    logger.error(err.message);
    throw new AppError(err.message, 500);
  }
};

export { get, create, show, update, del };

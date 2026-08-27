import {
  deleteUserCache,
  getUserCache,
  setUserCache,
} from "../cache/userCache.js";
import logger from "../config/logger.js";
import { User } from "../models/userModel.js";
import { AppError } from "../utils/appError.js";
import fs from "fs";
import path from "path";

const get = async (repository) => {
  try {
    const cached = await getUserCache();

    if (cached) {
      return cached;
    }
    const users = await repository.get();
    await setUserCache(users);

    logger.info("Get All Data");
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
    logger.info("Creating New User");

    return user;
  } catch (err) {
    logger.error(err.message);
    throw new AppError(err.message, err.status);
  }
};

const show = async (repository, params) => {
  try {
    const cached = await getUserCache();

    if (cached) {
      return cached;
    }

    const user = await repository.show(params);
    await setUserCache(user);

    logger.info("Get Spesific Data");
    return user;
  } catch (err) {
    logger.error(err.message);
    throw new AppError(err.message, err.status);
  }
};

const update = async (repository, payload, params) => {
  try {
    const user = await User.findOne({ name: params });

    if (!user) throw new AppError("User Not Found", 404);

    let imgPath = user.avatar;

    if (payload.file) {
      if (user.avatar) {
        const oldPath = path.join(__dirname, "../uploads/", user.avatar);

        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }

      imgPath = payload.file.filename;
    }

    const updated = await repository.update(params, {
      ...payload.body,
      avatar: imgPath,
    });

    await deleteUserCache();

    logger.info("Update User");

    return updated;
  } catch (err) {
    logger.error(err.message);
    throw new AppError(err.message, err.status);
  }
};

const del = async (repository, params) => {
  try {
    const user = await User.findOne({ name: params });

    if (user.avatar) {
      const imgPath = path.join(__dirname, ".../uploads", user.avatar);
      fs.unlinkSync(imgPath);
    }

    await repository.del(params);

    logger.info("Delete User");

    return {
      message: "Success",
    };
  } catch (err) {
    logger.error(err.message);
    throw new AppError(err.message, err.status);
  }
};

export { create, get, show, update, del };

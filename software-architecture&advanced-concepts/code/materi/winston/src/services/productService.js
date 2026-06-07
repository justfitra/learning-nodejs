import {
  deleteProductCache,
  getProductCache,
  setProductCache,
} from "../cache/productCache.js";
import { AppError } from "../utils/appError.js";
import path from "path";
import fs from "fs";
import { Products } from "../models/productModel.js";

const get = async (repository) => {
  try {
    const cached = await getProductCache();

    if (cached) {
      return cached;
    }

    const products = await repository.get();
    await setProductCache(products);

    return products;
  } catch (error) {
    throw new AppError(error.message, 500);
  }
};

const create = async (repository, payload) => {
  try {
    const product = await repository.create({
      ...payload.body,
      image: payload.file.filename,
    });

    await deleteProductCache();

    return product;
  } catch (err) {
    throw new AppError(err.message, 500);
  }
};

const show = async (repository, title) => {
  try {
    const cached = await getProductCache();

    if (cached) {
      return cached;
    }
    const product = await repository.show(title);
    await setProductCache(product);

    return product;
  } catch (err) {
    throw new AppError(err.message, 500);
  }
};

const update = async (repository, payload, title) => {
  try {
    const product = await repository.update(title, {
      ...payload,
      image: payload.file.filename,
    });

    await deleteProductCache();

    return product;
  } catch (err) {
    throw new AppError(err.message, 500);
  }
};

const del = async (repository, title) => {
  try {
    const prevImg = await Products.find({ title: title });

    if (prevImg.image) {
      const imgPath = path.join(__dirname, "../uploads", prevImg.image);
      fs.unlink(imgPath, (err) => {
        if (err) {
          console.error("Failed to update image : ", err);
        }
      });
    }
    const product = await repository.del(title);

    return product;
  } catch (err) {
    throw new AppError(err.message, 500);
  }
};

export { get, create, show, update, del };

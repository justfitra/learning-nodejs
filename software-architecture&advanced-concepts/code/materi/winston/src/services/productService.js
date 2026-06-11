import {
  deleteProductCache,
  getProductCache,
  setProductCache,
} from "../cache/productCache.js";
import { AppError } from "../utils/appError.js";
import path from "path";
import fs from "fs";
import { Products } from "../models/productModel.js";
import { fileURLToPath } from "url";
import logger from "../config/logger.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const get = async (repository) => {
  try {
    const cached = await getProductCache();

    if (cached) {
      return cached;
    }

    const products = await repository.get();
    await setProductCache(products);
    logger.info("Get data");
    return products;
  } catch (error) {
    logger.error(error.message);
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

    logger.info("Creating new post");

    return product;
  } catch (err) {
    logger.error(error.message);
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
    logger.info("Get product");
    return product;
  } catch (err) {
    logger.error(err.message);
    throw new AppError(err.message, 500);
  }
};

const update = async (repository, payload, name) => {
  try {
    const product = await Products.findOne({ title: name });

    if (!product) throw new AppError("Product not found", 404);

    let imgPath = product.image;

    if (payload.file) {
      if (product.image) {
        const oldPath = path.join(__dirname, "../uploads", product.image);

        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }
      imgPath = payload.file.filename;
    }

    const { title, price, description } = payload.body;

    const updated = await repository.update(name, {
      title,
      price,
      description,
      image: imgPath,
    });

    await deleteProductCache();
    logger.info("Update product");
    return updated;
  } catch (err) {
    logger.error(err.message);
    throw new AppError(err.message, 500);
  }
};

const del = async (repository, title) => {
  try {
    const product = await Products.findOne({ title: title });

    if (product.image) {
      const imgPath = path.join(__dirname, "../uploads", product.image);
      fs.unlinkSync(imgPath);
    }
    await repository.del(title);
    logger.info("Delete product");
    return "Success";
  } catch (err) {
    logger.error(err.message);
    throw new AppError(err.message, 500);
  }
};

export { get, create, show, update, del };

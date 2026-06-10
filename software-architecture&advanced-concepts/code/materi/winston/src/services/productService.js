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
    const product = await Products.findOne({ title: title });

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

    const { name, price, description } = payload;

    const updated = await repository.update(title, {
      name,
      price,
      description,
      image: imgPath,
    });

    await deleteProductCache();

    return updated;
  } catch (err) {
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

    return "Success";
  } catch (err) {
    throw new AppError(err.message, 500);
  }
};

export { get, create, show, update, del };

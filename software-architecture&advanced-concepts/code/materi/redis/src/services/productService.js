import {
  deleteProductCache,
  getProductCache,
  setProductCache,
} from "../cache/productCache.js";
import { AppError } from "../utils/appError.js";

const get = async (repository) => {
  try {
    const cached = await getProductCache();

    if (cached) {
      console.log("Data from Redis");
      return cached;
    }

    const products = await repository.get();
    await setProductCache(products);

    console.log("Data from Mongo DB");

    return products;
  } catch (err) {
    throw new AppError(err.message);
  }
};

const create = async (repository, payload) => {
  const product = await repository.create({
    ...payload.body,
    image: payload.file.filename,
  });

  await deleteProductCache();

  return product;
};

export { get, create };

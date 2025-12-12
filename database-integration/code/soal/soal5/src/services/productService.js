import { Product } from "../models/productModel.js";
import { AppError } from "../utils/AppError.js";

export const create = async (payload) => {
  if (payload.stock < 1) {
    throw new AppError("Stock must more than 0", 400);
  }
  const product = await Product.create(payload);

  return product;
};

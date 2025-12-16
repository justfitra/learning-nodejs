import { Product } from "../models/productModel.js";

export const create = async (payload) => {
  const product = await Product.create(payload);

  return product;
};

export const get = async () => {
  const products = await Product.find({ category: "food0" })
    .sort({ price: -1 })
    .limit(10)
    .explain("executionStats");

  return products;
};

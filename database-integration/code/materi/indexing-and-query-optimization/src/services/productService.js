import { Product } from "../models/productModel.js";

export const create = async (payload) => {
  const product = await Product.create(payload);

  return product;
};

export const get = async () => {
  const products = await Product.find({ category: "computer" }).explain(
    "executionStats"
  );

  return products;
};

import { Product } from "../models/productModel.js";

const get = async () => {
  const products = await Product.find();

  return products;
};

const create = async (payload) => {
  const product = await Product.create(payload);

  return product;
};

export { get, create };

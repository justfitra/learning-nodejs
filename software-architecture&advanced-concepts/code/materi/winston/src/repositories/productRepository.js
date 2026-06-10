import { Products } from "../models/productModel.js";

const get = async () => {
  const products = await Products.find();

  return products;
};

const create = async (payload) => {
  const product = await Products.create(payload);

  return product;
};

const show = async (title) => {
  const product = await Products.find({ title: title });

  return product;
};

const update = async (title, payload) => {
  const product = await Products.findOneAndUpdate(
    { title: title },
    { ...payload },
    { new: true, runValidators: true },
  );

  return product;
};

const del = async (title) => {
  const product = await Products.deleteOne({ title: title });

  return product;
};

export { get, create, update, show, del };

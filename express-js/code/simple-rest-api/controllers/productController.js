import { get, post } from "../services/productService.js";
import { formatResponse } from "../utils/formatResponse.js";

export const getAllProduct = (req, res, next) => {
  try {
    const products = get();

    res
      .status(200)
      .json(formatResponse(200, "Get All Products Success", products));
  } catch (err) {
    next(err);
  }
};

export const detailProduct = (req, res, next) => {
  try {
    const product = get(Number(req.params.idProduct));

    res.status(200).json(formatResponse(200, "Get Product Success", product));
  } catch (err) {
    next(err);
  }
};

export const addProduct = (req, res, next) => {
  try {
    const id = req.body.id;
    const name = req.body.name;
    const category = req.body.category;
    const price = req.body.price;
    const stock = req.body.stock;
    const description = req.body.description;
    const product = post(id, name, category, price, stock, description);

    res
      .status(201)
      .json(formatResponse(201, "Add New Product Success", product));
  } catch (err) {
    next(err);
  }
};

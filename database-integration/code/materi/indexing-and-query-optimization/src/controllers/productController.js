import * as productService from "../services/productService.js";
import { formatResponse } from "../utils/formatResponse.js";

export const createProduct = async (req, res, next) => {
  try {
    const product = await productService.create(req.body);

    return res
      .status(201)
      .json(formatResponse(201, "Product Created Succesfully", product));
  } catch (err) {
    next(err);
  }
};

export const getProducts = async (req, res, next) => {
  try {
    const products = await productService.get();

    return res.status(200).json(formatResponse(200, "Success", products));
  } catch (err) {
    next(err);
  }
};

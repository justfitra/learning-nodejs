import * as productService from "../services/productService.js";
import { formatResponse } from "../utils/formatResponse.js";

export const createProduct = async (req, res, next) => {
  try {
    const product = await productService.create(req.body);

    return res
      .status(201)
      .json(formatResponse(201, "Product Created Successfuly", product));
  } catch (err) {
    next(err);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const product = await productService.update(req.params.title, req.body);

    return res
      .status(200)
      .json(formatResponse(200, "Product Update Successfully", product));
  } catch (err) {
    next(err);
  }
};

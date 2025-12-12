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

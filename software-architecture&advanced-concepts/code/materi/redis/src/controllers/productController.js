import * as productService from "../services/productService.js";
import * as productRepository from "../repositories/productRepostory.js";
import { formatResponse } from "../utils/formatResponse.js";

const get = async (req, res, next) => {
  try {
    const products = await productService.get(productRepository);

    res.status(200).json(formatResponse(200, "Success", products));
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    // console.log(req);
    const product = await productService.create(productRepository, req);
    res.status(201).json(formatResponse(201, "Success", product));
  } catch (err) {
    next(err);
  }
};

export { get, create };

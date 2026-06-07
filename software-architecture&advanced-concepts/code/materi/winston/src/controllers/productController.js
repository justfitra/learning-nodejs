import * as productService from "../services/productService.js";
import * as productRepository from "../repositories/productRepository.js";
import { formatResposne } from "../utils/formatResponse.js";

const get = async (req, res, next) => {
  try {
    const products = await productService.get(productRepository);

    res.status(200).json(formatResposne(200, "Success", products));
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    const product = await productService.create(productRepository, req);

    res.status(201).json(formatResposne(201, "Success", product));
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const product = await productService.update(
      productRepository,
      req,
      req.params.title,
    );

    res.status(201).json(formatResposne(201, "Success", product));
  } catch (err) {
    next(err);
  }
};

const show = async (req, res, next) => {
  try {
    const product = await productService.show(
      productRepository,
      req.params.title,
    );

    res.status(200).json(formatResposne(200, "Success", product));
  } catch (err) {
    next(err);
  }
};

const del = async (req, res, next) => {
  try {
    const product = await productService.del(
      productRepository,
      req.params.title,
    );

    res.status(200).json(formatResposne(200, "Success"));
  } catch (err) {
    next(err);
  }
};

export { get, create, update, show, del };

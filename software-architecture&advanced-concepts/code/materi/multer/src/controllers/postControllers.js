import * as postService from "../services/postService.js";
import { formatResponse } from "../utils/formatResponse.js";
import * as postRepository from "../repositories/postRepository.js";

const get = async (req, res, next) => {
  try {
    const posts = await postService.get(postRepository);

    res.status(200).json(formatResponse(200, "Success", posts));
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    const post = await postService.create(postRepository, req);

    res.status(201).json(formatResponse(201, "Success"));
  } catch (err) {
    next(err);
  }
};

export { get, create };

import * as postService from "../services/postService.js";
import * as postRepository from "../repositories/postRepository.js";
import { formatResponse } from "../utils/formatResponse.js";

const get = async (req, res, next) => {
  try {
    const posts = await postService.get(postRepository);

    res.status(200).json(formatResponse(200, "Success", posts));
  } catch (err) {
    next(err);
  }
};

const show = async (req, res, next) => {
  try {
    const post = await postService.show(postRepository, req.params);

    res.status(200).json(formatResponse(200, "Success", post));
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    const post = await postService.create(postRepository, req);
    console.log(post);
    res.status(201).json(formatResponse(201, "Success", post));
  } catch (err) {
    next(err);
  }
};

export { create, show, get };

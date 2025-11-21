import validator from "validator";
import { removeDoubleWhiteSpace } from "../utils/sanitazer.js";
import { commentValidator } from "../validations/commentValidator.js";
import { formatResponse } from "../utils/formatResponse.js";
import { Comment } from "../models/commentModel.js";

const create = async (req, res, next) => {
  try {
    const trimUserame = removeDoubleWhiteSpace(req.body.username);
    const trimComment = removeDoubleWhiteSpace(req.body.comment);
    const sanitazeName = validator.escape(trimUserame);
    const saniteazeComment = validator.escape(trimComment);

    const playload = {
      ...req.body,
      username: sanitazeName,
      comment: saniteazeComment,
    };

    const { error } = commentValidator.validate(playload);

    if (error) {
      next(formatResponse(400, error.message));
    }

    const comment = await Comment.create(playload);

    res
      .status(201)
      .json(formatResponse(201, "Comment Succes Createdfully", comment));
  } catch (err) {
    next(err);
  }
};

const get = async (req, res, next) => {
  try {
    const comments = await Comment.find({});

    res.status(200).json(formatResponse(200, "Get all comment successfully"));
  } catch (err) {
    next(formatResponse(500, err.message));
  }
};
export { create, get };

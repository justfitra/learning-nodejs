import validator from "validator";
import {
  createUserValidation,
  updateUserValidation,
} from "../validations/userValidation.js";
import { formatResponse } from "../utils/formatResponse.js";
import { User } from "../models/userModel.js";
import {
  capFirstLetterInSentence,
  isRegexInjection,
  removeDoubleWhiteSpace,
  sanitizeKeyword,
} from "../utils/sanitazer.js";

export const create = async (req, res, next) => {
  try {
    const sanitazeEmail = validator.normalizeEmail(req.body.email);
    const trimName = removeDoubleWhiteSpace(req.body.name);
    const sanitazeName = capFirstLetterInSentence(trimName);

    const playload = {
      ...req.body,
      name: sanitazeName,
      email: sanitazeEmail,
    };

    const { error } = createUserValidation.validate(playload);

    if (error) {
      next(formatResponse(400, error.message));
    }

    const user = await User.create(playload);

    return res
      .status(201)
      .json(formatResponse(201, "User Created Successfully", user));
  } catch (err) {
    next(formatResponse(500, err.message));
  }
};

export const get = async (req, res, next) => {
  try {
    let keyword = req.query.keyword || "";

    if (isRegexInjection(keyword)) {
      next(formatResponse(400, "Keyword contains dangerous regex patterns."));
    }

    keyword = sanitizeKeyword(keyword);
    console.log(keyword);

    const users = await User.find({}).select("name email age website bio");

    if (users.length === 0) {
      next(formatResponse(404, "User Not Found, Please Input User First"));
    }

    return res
      .status(200)
      .json(formatResponse(200, "Successfully Get All User", users));
  } catch (err) {
    next(formatResponse(500, err.message));
  }
};

export const show = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select(
      "name email age website bio"
    );

    if (user.length === 0) {
      next(formatResponse(404, "User Not Found, Please Input User First"));
    }
    res
      .status(200)
      .json(formatResponse(200, "Successfully Get User Detail", user));
  } catch (err) {
    next(formatResponse(500, err.message));
  }
};

export const update = async (req, res, next) => {
  try {
    if (!req.body) {
      next(formatResponse(400, "No data provided"));
    }

    const sanitazeEmail = validator.normalizeEmail(req.body.email);
    const playload = { ...req.body, email: sanitazeEmail };
    const { error } = updateUserValidation.validate(playload);

    if (error) {
      next(formatResponse(400, error.message));
    }

    const user = await User.findOneAndUpdate(
      { name: req.params.name },
      playload,
      {
        new: true,
        runValidators: true,
      }
    );

    if (user.length === 0) {
      next(formatResponse(404, "User Not Found"));
    }

    return res
      .status(200)
      .json(formatResponse(200, "Update User Successfully", user));
  } catch (err) {
    next(formatResponse(500, err.message));
  }
};

export const del = async (req, res, next) => {
  try {
    await User.findOneAndDelete({ name: req.params.name });

    return res
      .status(200)
      .json(formatResponse(200, "Delete User Successfully"));
  } catch (err) {
    next(formatResponse(500, err.message));
  }
};

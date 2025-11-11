import { Major } from "../models/major.js";
import { formatResponse } from "../utils/formatResponse.js";

export const create = async (req, res, next) => {
  try {
    const data = new Major(req.body);
    const result = await data.save();

    res.status(201).json(formatResponse(201, "Successfully add data", result));
  } catch (err) {
    next(err);
  }
};

export const get = async (req, res, next) => {
  try {
    const result = await Major.find({}).populate("faculty");

    if (result.length === 0) throw new Error("Major not found");

    res.status(200).json(formatResponse(200, "Successfully get data", result));
  } catch (err) {
    next(err);
  }
};

export const show = async (req, res, next) => {
  try {
    const result = await Major.find({ name: req.params.name }).populate(
      "faculty"
    );
    if (result.length === 0) throw new Error("Major not found");

    res.status(200).json(formatResponse(200, "Successfully get data", result));
  } catch (err) {
    next(err);
  }
};

export const update = async (req, res, next) => {
  try {
    const result = await Major.findOneAndUpdate(
      { name: req.params.name },
      req.body,
      { new: true, runValidators: true }
    );

    if (!result) throw new Error("Major not found");

    res
      .status(200)
      .json(formatResponse(200, "Successfully update data", result));
  } catch (err) {
    next(err);
  }
};

export const del = async (req, res, next) => {
  try {
    const result = await Faculty.findOneAndDelete({ name: req.params.name });

    if (!result) throw new Error("Major not found");

    res.status(200).json(formatResponse(200, "Successfully delete data"));
  } catch (err) {
    next(err);
  }
};

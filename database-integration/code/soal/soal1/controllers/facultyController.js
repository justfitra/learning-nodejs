import { Faculty } from "../models/faculty.js";

export const create = async (req, res, next) => {
  try {
    const data = new Faculty(req.body);
    const result = await data.save();
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

export const get = async (req, res, next) => {
  try {
    const result = await Faculty.findById({});

    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

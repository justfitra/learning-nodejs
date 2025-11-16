import { Departement } from "../models/departement.js";
import { formatResponse } from "../utils/formatResponse.js";

export const create = async (req, res, next) => {
  try {
    const data = new Departement(req.body);
    const result = await data.save();

    res
      .status(201)
      .json(formatResponse(201, "Data Successfully Created", result));
  } catch (err) {
    next(err);
  }
};

export const get = async (req, res, next) => {
  try {
    const result = await Departement.find({}).select("name").populate("worker");

    res.status(201).json(formatResponse(200, "Succesfully Get Data", result));
  } catch (err) {
    next(err);
  }
};

export const show = async (req, res, next) => {
  try {
    const result = await Departement.find({ name: req.params.name });

    res.status(201).json(formatResponse(200, "Succesfully Get Data", result));
  } catch (err) {
    next(err);
  }
};

export const update = async (req, res, next) => {
  try {
    const result = await Departement.findOneAndUpdate(
      { name: req.params.name },
      req.body,
      {
        runValidators: true,
        new: true,
      }
    );

    res
      .status(201)
      .json(formatResponse(200, "Data Successfully Updated", result));
  } catch (err) {
    next(err);
  }
};

export const del = async (req, res, next) => {
  try {
    await Departement.findOneAndDelete({ name: req.params.name });

    res.status(201).json(formatResponse(200, "Data Successfully Deleted"));
  } catch (err) {
    next(err);
  }
};

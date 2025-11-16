import { Worker } from "../models/worker.js";
import { formatResponse } from "../utils/formatResponse.js";

export const create = async (req, res, next) => {
  try {
    const data = new Worker(req.body);
    const result = await data.save();

    res
      .status(201)
      .json(formatResponse(201, "Data Created Successfully", result));
  } catch (err) {
    next(err);
  }
};

export const get = async (req, res, next) => {
  try {
    const result = await Worker.find({ salary: { $gt: 5000000 } })
      .select("name position salary")
      .sort({ salary: -1 })
      .limit(2);
    res.status(200).json(formatResponse(200, "Success Get Data", result));
  } catch (err) {
    next(err);
  }
};

export const show = async (req, res, next) => {
  try {
    const result = await Worker.find({ name: req.params.name }).populate([
      "departement",
      "project",
    ]);

    res.status(200).json(formatResponse(200, "Success Get Data", result));
  } catch (err) {
    next(err);
  }
};

export const update = async (req, res, next) => {
  try {
    const result = await Worker.findOneAndUpdate(
      { name: req.params.name },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json(formatResponse(200, "Success Update Data", result));
  } catch (err) {
    next(err);
  }
};

export const del = async (req, res, next) => {
  try {
    await Worker.findOneAndDelete({ name: req.params.name });

    res.status(200).json(formatResponse(200, "Success Delete Data"));
  } catch (err) {
    next(err);
  }
};

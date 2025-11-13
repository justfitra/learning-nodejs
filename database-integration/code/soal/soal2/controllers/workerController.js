import { Departement } from "../models/departement.js";
import { formatResponse } from "../utils/formatResponse.js";
export const create = async (req, res, next) => {
  try {
    const data = new Departement(req.body);
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
    const result = await Departement.find({});

    res.status(200).json(formatResponse(200, "Success Get Data", result));
  } catch (err) {
    next(err);
  }
};

import { Student } from "../models/student.js";

export const create = async (req, res, next) => {
  try {
    const data = new Student(req.body);
    const result = await data.save();
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

export const get = async (req, res, next) => {
  try {
    const result = await Student.find({}).populate("faculty", "name");
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

export const show = async (req, res, next) => {
  try {
    const result = await Student.find({ name: req.params.name });
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

export const update = async (req, res, next) => {
  try {
    const result = await Student.findOneAndUpdate(
      { name: req.params.name },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!result) throw new Error("Student not found");

    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

export const del = async (req, res, next) => {
  try {
    const result = await Student.findOneAndDelete({ name: req.params.name });

    if (!result) throw new Error("Student not found");

    res.status(200).json({ message: "Delete Successfully" });
  } catch (err) {
    next(err);
  }
};

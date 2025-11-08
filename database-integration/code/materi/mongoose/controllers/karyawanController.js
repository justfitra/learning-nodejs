import { Karyawan } from "../models/karyawan.js";

// Create
export const create = async (req, res, next) => {
  try {
    const data = new Karyawan(req.body);
    const result = await data.save();
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

// Get
export const get = async (req, res, next) => {
  try {
    const result = await Karyawan.find().sort({ createdAt: -1 }).lean();

    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

// Show
export const show = async (req, res, next) => {
  try {
    const result = await Karyawan.find({ nama: req.params.nama });
    if (result.length === 0) {
      throw new Error("Data not found");
    }
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

// update
export const update = async (req, res, next) => {
  try {
    const result = await Karyawan.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!result)
      return res.status(404).json({ message: "Karyawan tidak ditemukan" });
    res.json(result);
  } catch (err) {
    next(err);
  }
};

// delete
export const deleteKaryawan = async (req, res, next) => {
  try {
    const result = await Karyawan.findByIdAndDelete(req.params.id);
    if (!result)
      return res.status(404).json({ message: "Karyawan tidak ditemukan" });
    res.json({ message: "Karyawan berhasil dihapus" });
  } catch (err) {
    next(err);
  }
};

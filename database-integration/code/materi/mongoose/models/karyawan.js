import mongoose from "mongoose";

const karyawanSchema = new mongoose.Schema(
  {
    nama: { type: String, required: true, trim: true },
    jenis_kelamin: { type: String, enum: ["L", "P"], required: true },
    nik: { type: String, required: true, unique: true },
    tanggal_lahir: { type: Date, required: true },
    alamat: { type: String },
    no_hp: { type: String },
    email: { type: String, lowercase: true, trim: true },
    tanggal_masuk: { type: Date, default: Date.now },
    status: { type: String, enum: ["aktif", "nonaktif"], default: "aktif" },
    jabatan: {
      _id: String,
      nama: String,
      gaji_pokok: Number,
    },
    departemen: {
      _id: String,
      nama: String,
    },
  },
  { timestamps: true }
);

export const Karyawan = mongoose.model("Karyawan", karyawanSchema);

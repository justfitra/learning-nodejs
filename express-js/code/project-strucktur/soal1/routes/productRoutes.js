import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({ message: "Daftar produk tersedia" });
});

router.post("/", (req, res) => {
  res.status(201).json({ message: "Produk baru ditambahkan" });
});

export default router;

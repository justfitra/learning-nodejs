import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({ message: "Daftar semua user" });
});

router.post("/", (req, res) => {
  res.status(201).json({ message: "User baru ditambahkan" });
});

export default router;

import express from "express";
import {
  create,
  deleteKaryawan,
  get,
  show,
  update,
} from "../controllers/karyawanController.js";

const router = express.Router();

router.get("/", get);
router.post("/", create);
router.get("/:nama", show);
router.patch("/:id", update);
router.delete("/:id", deleteKaryawan);

export default router;

import express from "express";
import {
  create,
  del,
  get,
  show,
  update,
} from "../controllers/studentController.js";

const router = express.Router();

router.get("/", get);
router.post("/", create);
router.get("/:name", show);
router.patch("/:name", update);
router.delete("/:name", del);

export default router;

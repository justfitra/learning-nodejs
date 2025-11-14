import express from "express";
import {
  create,
  del,
  get,
  show,
  update,
} from "../controllers/departementController.js";

const router = express.Router();

router.post("/", create);
router.get("/", get);
router.get("/:name", show);
router.patch("/:name", update);
router.delete("/:name", del);

export default router;

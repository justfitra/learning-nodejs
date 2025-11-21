import express from "express";
import {
  create,
  del,
  get,
  show,
  update,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/", get);
router.post("/", create);
router.get("/:id", show);
router.patch("/:name", update);
router.delete("/:name", del);

export default router;

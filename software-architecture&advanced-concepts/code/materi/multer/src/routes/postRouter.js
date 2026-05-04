import express from "express";
import * as postController from "../controllers/postControllers.js";
import { upload } from "../middlewares/upload.js";

const router = express.Router();

router.get("/", postController.get);
router.post("/", upload.array("images", 5), postController.create);

export default router;

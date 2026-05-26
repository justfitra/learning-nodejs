import express from "express";
import { validate } from "../middlewares/validate.js";
import { upload } from "../middlewares/upload.js";
import {
  createPostImageSchema,
  createPostSchema,
} from "../validations/postSchema.js";
import { imageValidate } from "../middlewares/imageValidate.js";
import * as postController from "../controllers/postControllers.js";

const router = express.Router();

router.get("/", postController.get);
router.get("/:title", postController.show);
router.post(
  "/",
  upload.single("image"),
  validate(createPostSchema),
  imageValidate(createPostImageSchema),
  postController.create,
);

export default router;

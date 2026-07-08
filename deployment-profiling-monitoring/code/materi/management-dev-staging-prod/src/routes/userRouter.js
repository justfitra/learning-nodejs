import express from "express";
import * as userController from "../controllers/userController.js";
import { upload } from "../middlewares/uploads.js";
import { validate } from "../middlewares/validate.js";
import {
  createUserAvatarScema,
  createUserSchema,
  updateUserAvatarSchema,
  updateUserSchema,
} from "../validations/userSchema.js";
import { imageValidate } from "../middlewares/imageValidate.js";
const router = express.Router();

router.get("/", userController.get);
router.post(
  "/",
  upload.single("avatar"),
  validate(createUserSchema),
  imageValidate(createUserAvatarScema),
  userController.create,
);
router.get("/:title", userController.show);
router.put(
  "/:title",
  upload.single("avatar"),
  imageValidate(updateUserAvatarSchema),
  validate(updateUserSchema),
  userController.update,
);
router.delete("/:title", userController.del);

export default router;

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
import { verifyToken } from "../middlewares/verifyToken.js";
import { authorization } from "../middlewares/authorization.js";
const router = express.Router();

router.get("/", verifyToken, authorization("user"), userController.get);
router.post(
  "/",
  upload.single("avatar"),
  validate(createUserSchema),
  verifyToken,
  authorization("user"),
  imageValidate(createUserAvatarScema),
  userController.create,
);
router.get("/:name", verifyToken, authorization("user"), userController.show);
router.put(
  "/:name",
  upload.single("avatar"),
  verifyToken,
  authorization("user"),
  imageValidate(updateUserAvatarSchema),
  validate(updateUserSchema),
  userController.update,
);
router.delete("/:name", userController.del);

export default router;

import express from "express";
import { authenticationValidate } from "../middlewares/authenticationValidate.js";
import { authorization } from "../middlewares/authorization.js";
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

router.get(
  "/",
  authenticationValidate,
  authorization("user"),
  userController.get,
);
router.post(
  "/",
  upload.single("avatar"),
  validate(createUserSchema),
  imageValidate(createUserAvatarScema),
  authenticationValidate,
  authorization("user"),
  userController.create,
);
router.get(
  "/:name",
  authenticationValidate,
  authorization("user"),
  userController.show,
);
router.put(
  "/:name",
  upload.single("avatar"),
  authenticationValidate,
  authorization("user"),
  imageValidate(updateUserAvatarSchema),
  validate(updateUserSchema),
  userController.update,
);
router.delete(
  "/:name",
  authenticationValidate,
  authorization("user"),
  userController.del,
);

export default router;

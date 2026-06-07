import express from "express";
import {
  createProductImageSchema,
  createProductSchema,
  updateProductImageSchema,
  updateProductSchema,
} from "../validations/productSchema.js";
import { validate } from "../middlewares/validate.js";
import { imageValidate } from "../middlewares/imageValidate.js";
import { upload } from "../middlewares/uploads.js";
import * as productController from "../controllers/productController.js";

const router = express.Router();

router.post(
  "/",
  upload.single("image"),
  validate(createProductSchema),
  imageValidate(createProductImageSchema),
  productController.create,
);
router.get("/", productController.get);
router.get("/:title", productController.show);
router.put(
  "/:title",
  upload.single("image"),
  validate(updateProductSchema),
  imageValidate(updateProductImageSchema),
  productController.update,
);
router.delete("/:title", productController.del);

export default router;

import express from "express";
import { validate } from "../middlewares/validate.js";
import { createProductSchema } from "../validations/productSchema.js";
import {
  createProduct,
  getProducts,
} from "../controllers/productController.js";

const router = express.Router();

router.post("/", validate(createProductSchema), createProduct);
router.get("/", getProducts);

export default router;

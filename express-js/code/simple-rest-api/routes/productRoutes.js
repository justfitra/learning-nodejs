import express from "express";
import {
  addProduct,
  detailProduct,
  getAllProduct,
} from "../controllers/productController.js";

const router = express.Router();

router.get("/", getAllProduct);
router.get("/:idProduct", detailProduct);
router.post("/", addProduct);

export default router;

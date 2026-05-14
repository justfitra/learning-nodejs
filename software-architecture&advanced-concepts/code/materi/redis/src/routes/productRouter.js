import express from "express";
import * as productController from "../controllers/productController.js";
import { upload } from "../middlewares/upload.js";
import { imageValidate, validate } from "../middlewares/validate.js";
import {
  createProductImageSchema,
  createProductSchema,
} from "../validations/productSchema.js";
import { redisClient } from "../config/redis.js";

const router = express.Router();

router.get("/", productController.get);
router.post(
  "/",
  upload.single("image"),
  validate(createProductSchema),
  imageValidate(createProductImageSchema),
  productController.create,
);
router.get("/health", async (req, res) => {
  const health = {
    server: "✅ OK",
    redis: "❌ Not Connected",
    timestamp: new Date().toISOString(),
  };

  try {
    const ping = await redisClient.ping();
    if (ping === "PONG") {
      health.redis = "✅ Connected";
    }
  } catch (error) {
    health.redis = `❌ ${error.message}`;
  }

  res.json(health);
});

export default router;

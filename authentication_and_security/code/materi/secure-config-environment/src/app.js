import express from "express";
import helmet from "helmet";
import cors from "cors";
import { envConfig } from "./config/envConfig.js";
import rateLimit from "express-rate-limit";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  limit: 50,
  message: "Too many requests, please try again later",
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: [`http://${envConfig.app_host}:${envConfig.app_port}`],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: true,
  })
);
app.use(limiter);

app.use();

app.use(errorHandler);

app.use(helmet());

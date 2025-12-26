import express from "express";
import cors from "cors";
import { envConfig } from "./config/envConfig.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import router from "./routes/userRouter.js";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

const app = express();
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: "draft-8",
  message: "Too many requests, try again later",
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(
  cors({
    origin: [`http://${envConfig.app_host}:${envConfig.app_port}`],
    metohds: ["PATCH"],
    credentials: true,
  })
);
app.use(limiter);

app.use("/api/users", router);
app.use(errorHandler);

export default app;

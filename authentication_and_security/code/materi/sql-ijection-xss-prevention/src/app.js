import express from "express";
import { errorHandler } from "./middlewares/errorHandler.js";
import cors from "cors";
import { envConfig } from "./config/envConfig.js";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import userRouter from "./routes/userRoutes.js";
import authRouter from "./routes/authRoutes.js";
import mongoSanitize from "express-mongo-sanitize";

const app = express();
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: "draft-8",
  message: "so many request please try again later",
});

app.use(express.json());
app.use(express.urlencoded());
app.use(helmet({ contentSecurityPolicy: true }));
app.use(
  cors({
    origin: [`http://${envConfig.app_host}:${envConfig.app_port}`],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(mongoSanitize());
app.use(limiter);

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);

app.use(errorHandler);

export default app;

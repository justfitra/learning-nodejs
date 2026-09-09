import express from "express";
import { erorrHandler } from "./middlewares/errorHandler.js";
import { requestLogger } from "./middlewares/requestLogger.js";
import userRouter from "./routes/userRoutes.js";
import authRouter from "./routes/authRoutes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);

app.use("/api/v1/user", userRouter);
app.use("/api/v1/auth", authRouter);

app.use(erorrHandler);

export default app;

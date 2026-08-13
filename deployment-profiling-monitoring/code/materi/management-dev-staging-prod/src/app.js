import express, { json } from "express";
import { requestLogger } from "./middlewares/requestLogger.js";
import userRouter from "./routes/userRouter.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import authRouter from "./routes/authRouter.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);

app.use("/api/v1/user", userRouter);
app.use("/api/v1/auth", authRouter);

app.use(errorHandler);

export default app;

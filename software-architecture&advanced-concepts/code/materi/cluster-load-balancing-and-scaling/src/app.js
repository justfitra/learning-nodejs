import express from "express";
import { errorHandler } from "./middlewares/errorHandler.js";
import userRouter from "./routes/userRouter.js";
import { requestLogger } from "./middlewares/requestLogger.js";
import { envConfig } from "./config/envConfig.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);
app.use((req, res, next) => {
  console.log(`[PORT ${envConfig.app_port}] ${req.method} ${req.url}`);
  next();
});
app.use("/api/v1/users", userRouter);

app.use(errorHandler);

export default app;

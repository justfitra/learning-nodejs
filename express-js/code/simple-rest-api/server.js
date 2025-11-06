import express from "express";
import { envConfig } from "./config.js";
import userRouter from "./routes/userRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";
import morgan from "morgan";
import { morganLogger } from "./utils/morganLogger.js";
import { logger } from "./middleware/logger.js";
import productRouter from "./routes/productRoutes.js";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("combined", { stream: morganLogger("access.log") }));
app.use(logger);
app.use("/users", userRouter);
app.use("/products", productRouter);
app.use(errorHandler);

app.listen(envConfig.port, () => {
  console.log(
    `${envConfig.app_name} running at http://${envConfig.host}:${envConfig.port}`
  );
});

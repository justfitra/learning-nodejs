import express from "express";
import { envConfig } from "./config.js";
import userRouter from "./routes/userRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRouter);
// app.use("/products");
app.use(errorHandler);

app.listen(envConfig.port, () => {
  console.log(
    `${envConfig.app_name} running at http://${envConfig.host}:${envConfig.port}`
  );
});

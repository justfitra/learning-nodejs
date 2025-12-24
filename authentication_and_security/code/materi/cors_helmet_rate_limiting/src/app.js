import express from "express";
import cors from "cors";
import { envConfig } from "./config/envConfig.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import router from "./routes/userRouter.js";

const app = express();

// const corsOption = ;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: [`http://${envConfig.app_host}:${envConfig.app_port}`],
    metohds: ["PATCH"],
    credentials: true,
  })
);

app.use("/api/users", router);
app.use(errorHandler);

export default app;

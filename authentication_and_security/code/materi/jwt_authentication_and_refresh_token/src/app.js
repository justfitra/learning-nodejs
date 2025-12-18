import express from "express";
import { errorHandler } from "./middlewares/errorHandler.js";
import userRouter from "./routes/userRouter.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/users", userRouter);
app.use(errorHandler);

export default app;

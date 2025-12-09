import express, { urlencoded } from "express";
import userRouter from "./routes/userRouter.js ";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();

app.use(express.json());
app.use(urlencoded({ extended: true }));

app.use("/api/users", userRouter);

app.use(errorHandler);

export default app;

import express from "express";
import userRouter from "./routes/userRoute.js";
import { erorHandler } from "./middleware/errorHandler.js";
import commentRouter from "./routes/commentRoute.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", userRouter);
app.use("/api/comments", commentRouter);

app.use(erorHandler);

export default app;

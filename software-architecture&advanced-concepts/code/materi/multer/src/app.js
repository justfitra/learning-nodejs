import express from "express";
// import userRouter from "./routes/userRouter.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import postRouter from "./routes/postRouter.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use("/api/v1/users", userRouter);
app.use("/api/v1/posts", postRouter);

app.use(errorHandler);

export default app;

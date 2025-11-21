import express from "express";
import userRouter from "./routes/userRouter.js";
import { clientErrorHandler } from "./middleware/errorHandler.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRouter);
app.get("/", (req, res) => {
  res.send("hello");
});

app.use(clientErrorHandler);
export default app;

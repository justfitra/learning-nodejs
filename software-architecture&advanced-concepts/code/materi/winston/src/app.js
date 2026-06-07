import express from "express";
import { errorHandler } from "./middlewares/errorHandler.js";
import productRouter from "./routes/productRouter.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/product/", productRouter);

app.use(errorHandler);

export default app;

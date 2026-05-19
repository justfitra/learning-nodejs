import express, { json, urlencoded } from "express";
import postRouter from "../../redis/src/routes/productRouter.js";

const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));

app.use("/api/v1/post", postRouter);

export default app;

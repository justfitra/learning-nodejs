import express from "express";
import useRouter from "./routes/userRouter.js";

const app = express();

app.use(express.json());
app.use("/users", useRouter);

app.listen(3000);

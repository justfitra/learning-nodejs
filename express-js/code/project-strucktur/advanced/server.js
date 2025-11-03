import express from "express";
import userRoute from "./routes/userRoute.js";
import dotenv from "dotenv";
import { errorHandling } from "./middleware/errorHandling.js";

dotenv.config();
const app = express();

app.use(express.json());

app.use("/users", userRoute);
app.use(errorHandling);

app.listen(process.env.PORT, () => {
  console.log(
    `Server running at http://${process.env.HOST}:${process.env.PORT}`
  );
});

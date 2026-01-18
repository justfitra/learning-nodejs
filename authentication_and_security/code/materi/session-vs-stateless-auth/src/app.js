import express, { urlencoded } from "express";
import helmet from "helmet";
import cors from "cors";
import { envConfig } from "./config/envConfig.js";
import rateLimit from "express-rate-limit";
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import cookieSession from "cookie-session";
const app = express();

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // fistNumber => minutes, secondNumber => seconds, thirdNumber => miliseconds
  limit: 100, // how limit per 10 minutes or per windows Ms
  message: "Too many request", // alert messagges
});
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(helmet());
app.use(
  cors({
    origin: [`http://${envConfig.app_host}:${envConfig.app_port}`],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);
app.use(limiter);
app.use(
  cookieSession({
    name: "session",
    keys: ["key1", "key2"],
    path: "/api/auth/register",
    domain: "http://localhost:4000",
    maxAge: 48 * 60 * 60 * 1000, // 2 days
  }),
);

app.use("/api/auth/", authRouter);
app.use("/api/users/", userRouter);

app.use(errorHandler);

export default app;

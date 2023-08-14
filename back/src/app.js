import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";
import errorMiddleware from "./middleware/errorMiddleware";
import loggerMiddleware from "./middleware/loggerMiddleware";
import userRouter from "./routes/userRouter";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
require("./models/index");

app.use(loggerMiddleware);

//todo 앞으로 작성될 라우터핸들러 위치
// app.use(userRouter);

app.use(errorMiddleware);
export { app };

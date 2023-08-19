import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";
import errorMiddleware from "./middlewares/errorMiddleware";
import loggerMiddleware from "./middlewares/loggerMiddleware";
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
import authRoutes from "./routers/authRouter";
import userRoutes from "./routers/userRouter";
import groupRoutes from "./routers/groupRouter";
import uploadRouter from "./routers/uploadRouter";
import loadRouter from "./routers/loadRouter";
const passport = require("passport");
import { local, jwt } from "./config";
import path from "path";
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(loggerMiddleware);
app.use(passport.initialize());
passport.use("local", local);
passport.use("jwt", jwt);

app.use(authRoutes);
app.use(userRoutes);
app.use(groupRoutes);
app.use(uploadRouter);
app.use(loadRouter);

app.use(errorMiddleware);

/** @description 프로세스 종료 후 프리즈마 연결해제 */
process.on("SIGINT", async () => {
	await prisma.$disconnect();
	process.exit();
});

export { app };

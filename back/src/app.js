import cors from 'cors';
import express from 'express';
import cookieParser from 'cookie-parser';
import errorMiddleware from './middlewares/errorMiddleware';
import loggerMiddleware from './middlewares/loggerMiddleware';
import authRoutes from './routers/authRouter';
import userRoutes from './routers/userRouter';
import groupRoutes from './routers/groupRouter';
import uploadRouter from './routers/uploadRouter';
import loadRouter from './routers/loadRouter';
import commentRouter from './routers/commentRouter';
import { local, jwt } from './config';
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const passport = require('passport');
const app = express();

app.use('/images', express.static('public'));
passport.use('local', local);
passport.use('jwt', jwt);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(loggerMiddleware);
app.use(passport.initialize());

app.use(authRoutes);
app.use(userRoutes);
app.use(groupRoutes);
app.use(uploadRouter);
app.use(loadRouter);
app.use(commentRouter);

app.use(errorMiddleware);

/** @description 프로세스 종료 후 프리즈마 연결해제 */
process.on('SIGINT', async () => {
	await prisma.$disconnect();
	process.exit();
});

module.exports = { app };

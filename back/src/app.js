import cors from 'cors';
import express from 'express';
import cookieParser from 'cookie-parser';
import http from 'http';
import path from 'path';
import passport from 'passport';
import swaggerUi from 'swagger-ui-express';
import errorMiddleware from './middlewares/errorMiddleware';
import loggerMiddleware from './middlewares/loggerMiddleware';
import authRoutes from './routers/authRouter';
import userRoutes from './routers/userRouter';
import groupRoutes from './routers/groupRouter';
import uploadRouter from './routers/uploadRouter';
import commentRouter from './routers/commentRouter';
import ploRouter from './routers/ploRouter';
import { local, jwt } from './config';
import swaggerFile from './config/swagger-output.json';

const initializeSocketServer = require('./socket');

const app = express();
const server = http.createServer(app);
const io = initializeSocketServer(server);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));
app.use(passport.initialize());
passport.use('local', local);
passport.use('jwt', jwt);
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerFile, { explorer: true }),
);

app.use(loggerMiddleware);

app.use(authRoutes);
app.use(userRoutes);
app.use(groupRoutes);
app.use(uploadRouter);
app.use(commentRouter);
app.use(ploRouter);

app.use(errorMiddleware);

app.io = io;

export default app;

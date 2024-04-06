import cors from 'cors';
import express from 'express';
import cookieParser from 'cookie-parser';
import http from 'http';
import path from 'path';
import passport from 'passport';
import swaggerUi from 'swagger-ui-express';
import errorMiddleware from './middlewares/errorMiddleware';
import loggerMiddleware from './middlewares/loggerMiddleware';
import authRoutes from './routes/auth/auth.route';
import userRoutes from './routes/user/userRoute';
import groupRoutes from './routes/group/groupRoute';
import uploadRoute from './routes/upload/uploadRoute';
import commentRoute from './routes/comment/commentRoute';
import ploRoute from './routes/plo/ploRoute';
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
app.use(uploadRoute);
app.use(commentRoute);
app.use(ploRoute);

app.use(errorMiddleware);

app.io = io;

export default app;

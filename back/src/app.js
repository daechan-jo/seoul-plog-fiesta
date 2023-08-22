import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";
import errorMiddleware from "./middlewares/errorMiddleware";
import loggerMiddleware from "./middlewares/loggerMiddleware";
import authRoutes from "./routers/authRouter";
import userRoutes from "./routers/userRouter";
import groupRoutes from "./routers/groupRouter";
import uploadRouter from "./routers/uploadRouter";
import loadRouter from "./routers/loadRouter";
import commentRouter from "./routers/commentRouter";
import http from "http";
import { Server } from "socket.io";
import { local, jwt } from "./config";
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const passport = require("passport");
const app = express();
import chatController from "./controllers/chatController";
const server = http.createServer(app);
const io = new Server(server);

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
app.use(commentRouter);

app.use(errorMiddleware);

/** @description 채팅 서비스 */
io.on("connection", (socket) => {
	socket.on("join_chat_room", async (senderId, recipientId) => {
		await chatController.handleJoinChatRoom(socket, senderId, recipientId);
	});

	socket.on("send_message", async ({ roomId, senderId, content }) => {
		await chatController.handleSendMessage(io, roomId, senderId, content);
	});
});

/** @description 프로세스 종료 후 프리즈마 연결해제 */
process.on("SIGINT", async () => {
	await prisma.$disconnect();
	process.exit();
});

module.exports = { app };

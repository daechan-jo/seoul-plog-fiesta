const express = require("express");
const jwt = require("jsonwebtoken");
const chatController = require("../controllers/chatController");
const chatService = require("../services/chatService");
const authenticateJWT = require("../middlewares/authenticateJWT");

const chatRouter = express.Router();

// Route to handle creating private messages
chatRouter.post(
	"/messages",
	authenticateJWT,
	chatController.createPrivateMessage,
);

module.exports = (io) => {
	// Socket.IO connection handling
	io.on("connection", (socket) => {
		socket.on("private chat", async (data) => {
			const { token, targetUserId, content } = data;
			const decoded = jwt.verify(token, process.env.JWT_SECRET);

			if (decoded) {
				const message = await chatService.createPrivateMessage(
					decoded.id,
					targetUserId,
					content,
				);
				io.to(targetUserId).emit("new private message", message);
			}
		});

		socket.on("disconnect", () => {
			console.log("User disconnected");
		});
	});

	return chatRouter;
};

const chatService = require("../services/chatService.js");

async function createPrivateMessage(req, res) {
	const { targetUserId, content } = req.body;
	const senderId = req.user.id;

	const message = await chatService.createPrivateMessage(
		senderId,
		targetUserId,
		content,
	);

	res.status(201).json(message);
}

module.exports = { createPrivateMessage };

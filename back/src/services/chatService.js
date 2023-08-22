const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function createChatRoom(senderId, recipientId) {
	const roomId = [senderId, recipientId].sort().join("-");
	const existingRoom = await prisma.chatRoom.findUnique({
		where: { id: roomId },
	});
	if (!existingRoom) {
		await prisma.chatRoom.create({
			data: {
				id: roomId,
				users: {
					connect: [{ id: senderId }, { id: recipientId }],
				},
			},
		});
	}
	return roomId;
}

async function getChatRoom(roomId) {
	return prisma.chatRoom.findMany({
		where: {
			users: {
				some: {
					id: userId,
				},
			},
		},
	});
}

async function getMessages(roomId) {
	return prisma.message.findMany({
		where: {
			chatRoomId: roomId,
		},
	});
}

async function createMessage(roomId, senderId, content) {
	return prisma.message.create({
		data: {
			content,
			chatRoom: { connect: { id: roomId } },
			sender: { connect: { id: senderId } },
		},
	});
}

module.exports = {
	createChatRoom,
	getChatRoom,
	getMessages,
	createMessage,
};

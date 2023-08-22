const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function createPrivateMessage(senderId, receiverId, content) {
	try {
		const chatRoomId = await getOrCreateChatRoomId(senderId, receiverId);
		return await prisma.message.create({
			data: {
				content,
				sender: { connect: { id: senderId } },
				chatRoom: { connect: { id: chatRoomId } },
			},
		});
	} catch (error) {
		throw error;
	}
}

async function getOrCreateChatRoomId(userId1, userId2) {
	const chatRoom = await prisma.chatRoom.findFirst({
		where: {
			AND: [
				{ users: { some: { id: userId1 } } },
				{ users: { some: { id: userId2 } } },
			],
		},
	});

	if (chatRoom) {
		return chatRoom.id;
	} else {
		const newChatRoom = await prisma.chatRoom.create({
			data: {
				users: { connect: [{ id: userId1 }, { id: userId2 }] },
			},
		});
		return newChatRoom.id;
	}
}

module.exports = {
	createPrivateMessage,
};

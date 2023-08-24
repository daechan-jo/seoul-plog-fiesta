const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getUnreadChatList = async (userId) => {
	try {
		const chatMessages = await prisma.chatMessage.findMany({
			where: {
				isRead: false,
			},
			orderBy: {
				createdAt: 'asc',
			},
		});
		return chatMessages.filter(
			(message) =>
				message.roomId.startsWith(`${userId}_`) ||
				message.roomId.startsWith(`_${userId}`),
		);
	} catch (error) {
		throw error;
	}
};

module.exports = { getUnreadChatList };

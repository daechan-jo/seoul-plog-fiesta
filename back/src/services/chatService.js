const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getUnreadChatList = async (userId) => {
	try {
		return await prisma.chatMessage.findMany({
			where: {
				OR: [
					{ roomId: { endsWith: `_${userId}` } },
					{ roomId: { startsWith: `${userId}_` } },
				],
				isRead: false,
			},
			orderBy: {
				createdAt: 'asc',
			},
		});
	} catch (error) {
		throw error;
	}
};

module.exports = { getUnreadChatList };

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getUnreadChatList = async (userId) => {
	try {
		return await prisma.chatMessage.findMany({
			where: {
				OR: [
					{ roomId: { startsWith: `${userId}_` } },
					{ roomId: { startsWith: `_${userId}` } },
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

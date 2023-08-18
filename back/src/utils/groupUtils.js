const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const isUserGroupAdmin = async (userId, groupId) => {
	const group = await prisma.group.findUnique({
		where: {
			id: groupId,
		},
		include: {
			manager: true,
		},
	});
	return group.managerId === userId;
};

const isUserGroupMember = async (userId, groupId) => {
	const groupUser = await prisma.groupUser.findUnique({
		where: {
			userId_groupId: {
				userId: userId,
				groupId: groupId,
			},
		},
	});

	return !!groupUser;
};

const getGroupUser = async (userId, groupId) => {
	return prisma.groupUser.findUnique({
		where: {
			userId_groupId: {
				userId: userId,
				groupId: groupId,
			},
			// userId: userId,
			// groupId: groupId,
			isAccepted: true,
		},
	});
};

const isGroupManager = async (userId, groupId) => {
	try {
		const groupUser = await prisma.groupUser.findFirst({
			where: {
				userId: userId,
				groupId: groupId,
				isAccepted: true,
			},
		});

		return groupUser ? groupUser.isAdmin : false;
	} catch (error) {
		throw error;
	}
};

module.exports = {
	isUserGroupAdmin,
	isUserGroupMember,
	getGroupUser,
	isGroupManager,
};

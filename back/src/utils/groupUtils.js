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
	return prisma.groupUser.findUnique({
		where: {
			userId_groupId: {
				userId: userId,
				groupId: groupId,
			},
		},
	});
};

const getGroupUser = async (userId, groupId) => {
	return prisma.groupUser.findUnique({
		where: {
			userId_groupId: {
				userId: userId,
				groupId: groupId,
			},
		},
	});
};

const isGroupManager = async (userId, groupId) => {
	try {
		const groupManager = await prisma.group.findUnique({
			where: {
				id: groupId,
			},
			select: {
				manager: {
					select: {
						id: true,
					},
				},
			},
		});

		return groupManager && groupManager.manager.id === userId;
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

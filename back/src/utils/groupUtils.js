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
	const groupUser = await prisma.groupUser.findFirst({
		where: {
			userId,
			groupId,
		},
	});

	return !!groupUser;
};

module.exports = {
	isUserGroupAdmin,
	isUserGroupMember,
};

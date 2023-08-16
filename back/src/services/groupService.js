const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createGroup = async (groupData) => {
	try {
		return await prisma.group.create(groupData);
	} catch (error) {
		throw error;
	}
};

const getALlGroups = async () => {
	try {
		return await prisma.group.findMany();
	} catch (error) {
		throw error;
	}
};

//todo 가벼운 경고 확인
const getGroupDetails = async (groupId) => {
	try {
		return await prisma.group.findUnique({
			where: {
				id: groupId,
			},
			include: {
				GroupUser: {
					include: {
						user: true,
					},
				},
			},
		});
	} catch (error) {
		throw error;
	}
};

module.exports = { createGroup, getALlGroups, getGroupDetails };

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createGroup = async (groupData) => {
	const { name, managerId, goal, region, introduction } = groupData;
	try {
		return await prisma.group.create({
			data: {
				name,
				managerId,
				goal,
				region,
				introduction,
			},
		});
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

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

const isUserGroupMember = async (userId, groupId) => {
	try {
		const groupUser = await prisma.groupUser.findFirst({
			where: {
				userId,
				groupId,
			},
		});
		return !!groupUser;
	} catch (error) {
		throw error;
	}
};

const requestToJoinGroup = async (userId, groupId) => {
	try {
		await prisma.groupUser.create({
			data: {
				userId,
				groupId,
				isAccepted: false,
			},
		});
	} catch (error) {
		throw error;
	}
};

const approveRegistration = async (groupId, userId) => {
	try {
		await prisma.groupUser.updateMany({
			where: {
				groupId,
				userId,
			},
			data: {
				isAccepted: true,
			},
		});
	} catch (error) {
		throw error;
	}
};

const getUserGroups = async (userId) => {
	try {
		const groups = await prisma.groupUser.findMany({
			where: {
				userId,
				isAccepted: true,
			},
			include: {
				group: true,
			},
		});
		return groups.map((groupUser) => groupUser.group);
	} catch (error) {
		throw error;
	}
};

const getRandomGroups = async () => {
	try {
		return await prisma.group.findMany({
			take: 10,
			orderBy: {
				id: "desc",
			},
			include: {
				manager: true,
				GroupUser: true,
			},
		});
	} catch (error) {
		throw error;
	}
};

const searchGroupsByName = async (groupName) => {
	try {
		return await prisma.group.findMany({
			where: {
				name: {
					contains: groupName,
				},
			},
		});
	} catch (error) {
		throw error;
	}
};

module.exports = {
	createGroup,
	getALlGroups,
	getGroupDetails,
	isUserGroupMember,
	requestToJoinGroup,
	approveRegistration,
	getUserGroups,
	getRandomGroups,
	searchGroupsByName,
};

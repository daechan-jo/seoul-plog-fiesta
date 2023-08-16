const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const groupUtils = require("../utils/groupUtils");

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

const createPost = async (postData, user) => {
	const { writerId, groupId, title, content, isNotice } = postData;
	const isAdmin = await groupUtils.isUserGroupAdmin(writerId, groupId);

	if (isNotice && !isAdmin) throw new Error("공지사항 작성 권한이 없음");
	if (!(await groupUtils.isUserGroupMember(writerId, groupId)))
		throw new Error("그룹 멤버가 아님");

	try {
		return await prisma.post.create({
			data: {
				writerId,
				groupId,
				title,
				content,
				isNotice,
			},
		});
	} catch (error) {
		throw error;
	}
};

const createComment = async (commentData, user) => {
	const { writerId, postId, content } = commentData;
	try {
		return await prisma.comment.create({
			data: {
				writerId,
				postId,
				content,
			},
		});
	} catch (error) {
		throw error;
	}
};

const getAllPosts = async () => {
	try {
		return await prisma.post.findMany({
			include: {
				writer: true,
				group: true,
				comments: true,
			},
		});
	} catch (error) {}
};

const getPostById = async (postId) => {
	try {
		return await prisma.post.findUnique({
			where: {
				id: postId,
			},
			include: {
				writer: true,
				group: true,
				comments: true,
			},
		});
	} catch (error) {
		throw error;
	}
};

const editPost = async (postId, postData) => {
	try {
		const filteredData = Object.entries(postData).reduce(
			(acc, [key, value]) => {
				if (value !== null) {
					acc[key] = value;
				}
				return acc;
			},
			{},
		);
		return await prisma.post.update({
			where: {
				id: postId,
			},
			data: filteredData,
			include: {
				writer: true,
				group: true,
				comments: true,
			},
		});
	} catch (error) {
		throw error;
	}
};

const deletePost = async (postId, userId) => {
	try {
		const post = await prisma.post.findUnique({
			where: {
				id: postId,
			},
			include: {
				writer: true,
				group: true,
			},
		});
		if (!post) throw new Error("존재하지 않는 게시글");
		const isAdmin = await groupUtils.isUserGroupAdmin(userId, post.groupId);
		if (post.writerId !== userId && !isAdmin)
			throw new Error("권한이 없음");

		await prisma.comment.deleteMany({
			where: {
				postId: postId,
			},
		});

		await prisma.post.delete({
			where: {
				id: postId,
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
	createPost,
	createComment,
	getAllPosts,
	getPostById,
	editPost,
	deletePost,
};

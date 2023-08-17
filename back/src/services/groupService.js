const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const groupUtils = require("../utils/groupUtils");

const createGroup = async (groupData, managerId) => {
	const { name, goal, region, introduction } = groupData;
	try {
		return await prisma.group.create({
			data: {
				name,
				manager: {
					connect: { id: managerId },
				},
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

const getGroupJoinRequests = async (groupId) => {
	try {
		return await prisma.groupUser.findMany({
			where: {
				groupId: groupId,
				isAccepted: false,
			},
			include: {
				user: true,
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

const rejectGroupJoinRequest = async (groupId, userId) => {
	try {
		const groupUser = await prisma.groupUser.findFirst({
			where: {
				userId: userId,
				groupId: groupId,
				isAccepted: false,
			},
		});
		if (!groupUser) throw new Error("가입 신청이 없음");
		await prisma.groupUser.delete({
			where: {
				userId_groupId: {
					userId: userId,
					groupId: groupId,
				},
			},
		});
		return true;
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

const getCommentDetails = async (commentId) => {
	try {
		return await prisma.comment.findUnique({
			where: {
				id: commentId,
			},
			include: {
				post: {
					include: {
						group: true,
					},
				},
			},
		});
	} catch (error) {
		throw error;
	}
};

const editComment = async (commentId, content) => {
	try {
		return await prisma.comment.update({
			where: {
				id: commentId,
			},
			data: {
				content,
			},
		});
	} catch (error) {
		throw error;
	}
};

const deleteComment = async (commentId) => {
	try {
		await prisma.comment.delete({
			where: {
				id: commentId,
			},
		});
	} catch (error) {
		throw error;
	}
};

const leaveGroup = async (userId, groupId) => {
	try {
		await prisma.groupUser.delete({
			where: {
				userId_groupId: {
					userId: userId,
					groupId: groupId,
				},
			},
		});
	} catch (error) {
		throw error;
	}
};

const removeGroupMember = async (userId, groupId) => {
	try {
		const isRemoved = await prisma.groupUser.delete({
			where: {
				userId_groupId: {
					userId: userId,
					groupId: groupId,
				},
			},
		});
		return isRemoved !== null;
	} catch (error) {
		throw error;
	}
};

const dropGroup = async (groupId) => {
	try {
		const group = await prisma.group.findUnique({
			where: {
				id: groupId,
			},
			include: {
				posts: {
					select: {
						id: true,
					},
				},
			},
		});
		if (!group) throw new Error("존재하지 않는 그룹");
		if (group.managerId !== userId) throw new Error("권한이 없음");

		await prisma.groupUser.deleteMany({
			where: {
				groupId: groupId,
			},
		});

		const postIds = group.posts.map((post) => post.id);
		await prisma.post.deleteMany({
			where: {
				id: {
					in: postIds,
				},
			},
		});

		await prisma.group.delete({
			where: {
				id: groupId,
			},
		});
		return true;
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
	getCommentDetails,
	editComment,
	deleteComment,
	leaveGroup,
	isUserGroupAdmin,
	removeGroupMember,
	dropGroup,
	rejectGroupJoinRequest,
	getGroupJoinRequests,
};

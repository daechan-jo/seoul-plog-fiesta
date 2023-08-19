const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const groupUtils = require("../utils/groupUtils");

const createGroup = async (groupData, managerId) => {
	const { name, goal, region, introduction } = groupData;
	try {
		const checkGroup = await prisma.group.findFirst({
			where: {
				name,
			},
		});
		if (checkGroup) throw new Error("이미 존재하는 그룹 이름");
		const userGroupCount = await prisma.group.count({
			where: {
				managerId: managerId,
			},
		});
		if (userGroupCount >= 5) throw new Error("그룹 생성 제한 초과");
		const createdGroup = await prisma.group.create({
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
		await prisma.groupUser.create({
			data: {
				userId: managerId,
				groupId: createdGroup.id,
				isAdmin: true,
				isAccepted: true,
			},
		});
		return createdGroup;
	} catch (error) {
		throw error;
	}
};

const getALlGroups = async () => {
	try {
		const groups = await prisma.group.findMany({
			select: {
				id: true,
				name: true,
				goal: true,
				region: true,
				memberLimit: true,
				posts: true,
				GroupUser: {
					select: {
						userId: true,
					},
				},
			},
		});

		return groups.map((group) => ({
			...group,
			memberCount: group.GroupUser.length,
		}));
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

const getGroupJoinRequests = async (managerId) => {
	try {
		return await prisma.group.findMany({
			where: {
				managerId: managerId,
				GroupUser: {
					some: {
						isAccepted: false,
						isAdmin: false,
					},
				},
			},
			include: {
				GroupUser: {
					where: {
						isAccepted: false,
						isAdmin: false,
					},
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

const acceptRegistration = async (managerId, groupId, userId) => {
	try {
		const groupUser = await prisma.groupUser.findUnique({
			where: {
				userId_groupId: {
					groupId: groupId,
					userId: userId,
				},
			},
			include: {
				group: true,
			},
		});
		if (!groupUser) throw new Error("가입 신청 없음");
		if (groupUser.group.managerId !== managerId)
			throw new Error("권한 없음");
		return await prisma.groupUser.update({
			where: {
				userId_groupId: {
					userId: userId,
					groupId: groupId,
				},
			},
			data: {
				isAccepted: true,
			},
		});
	} catch (error) {
		throw error;
	}
};

const rejectGroupJoinRequest = async (managerId, groupId, userId) => {
	try {
		const groupUser = await prisma.groupUser.findUnique({
			where: {
				userId_groupId: {
					groupId: groupId,
					userId: userId,
				},
			},
			include: {
				group: true,
			},
		});
		if (!groupUser) throw new Error("가입 신청 없음");
		if (groupUser.group.managerId !== managerId)
			throw new Error("권한 없음");

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

const getMyGroups = async (userId) => {
	try {
		return await prisma.groupUser.findMany({
			where: {
				userId: userId,
			},
			select: {
				groupId: true,
				group: {
					select: {
						id: true,
						name: true,
						managerId: true,
						manager: {
							select: {
								id: true,
								name: true,
								nickname: true,
							},
						},
					},
				},
			},
		});
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

const createPost = async (userId, groupId, title, content, isNotice) => {
	try {
		const groupUser = await groupUtils.getGroupUser(userId, groupId);
		if (!groupUser) throw new Error("그룹 구성원 아님");
		const isManager = await groupUtils.isGroupManager(userId, groupId);
		if (isNotice && !isManager) throw new Error("권한 없음");
		return await prisma.post.create({
			data: {
				writer: {
					connect: { id: userId },
				},
				group: {
					connect: { id: groupId },
				},
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

const getAllPosts = async (groupId) => {
	try {
		return await prisma.post.findMany({
			where: {
				groupId,
			},
		});
	} catch (error) {
		throw error;
	}
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

const getRecentPosts = async (userId) => {
	try {
		const userGroupIds = await prisma.groupUser.findMany({
			where: {
				userId: userId,
				isAccepted: true,
			},
			select: {
				groupId: true,
			},
		});
		const groupIds = userGroupIds.map((userGroup) => userGroup.groupId);
		return await prisma.post.findMany({
			where: {
				groupId: { in: groupIds },
			},
			orderBy: {
				createdAt: "desc",
			},
		});
	} catch (error) {
		throw error;
	}
};

const editPost = async (postId, userId, postData) => {
	try {
		const post = await prisma.post.findUnique({ where: { id: postId } });
		if (!post) throw new Error("존재하지 않는 게시글");
		if (post.writerId !== userId) throw new Error("권한이 없음");
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
	acceptRegistration,
	getMyGroups,
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
	getRecentPosts,
};

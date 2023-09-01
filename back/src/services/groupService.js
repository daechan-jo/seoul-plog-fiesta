const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const groupUtils = require('../utils/groupUtils');
const fs = require('fs');
const path = require('path');

const createGroup = async (groupData, managerId) => {
	const { name, goal, region, introduction } = groupData;
	try {
		const checkGroup = await prisma.group.findFirst({
			where: {
				name,
			},
		});
		if (checkGroup) throw new Error('이미 존재하는 그룹 이름');
		const userGroupCount = await prisma.group.count({
			where: {
				managerId: managerId,
			},
		});
		if (userGroupCount >= 5) throw new Error('그룹 생성 제한 초과');
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
		const groupId = createdGroup.id;
		await prisma.groupUser.create({
			data: {
				userId: managerId,
				groupId: groupId,
				isAdmin: true,
				isAccepted: true,
			},
		});
		return createdGroup;
	} catch (error) {
		throw error;
	}
};

const getAllGroups = async (page, limit) => {
	try {
		const totalGroupsCount = await prisma.group.count();
		const totalPages = Math.ceil(totalGroupsCount / limit);
		const paginationOptions =
			page !== null && limit !== null
				? { skip: (page - 1) * limit, take: limit }
				: {};
		const groups = await prisma.group.findMany({
			select: {
				id: true,
				managerId: true,
				name: true,
				goal: true,
				region: true,
				groupUser: {
					select: {
						userId: true,
						isAccepted: true,
					},
				},
			},
			...paginationOptions,
		});
		return await Promise.all(
			groups.map(async (group) => {
				const memberCount = await prisma.groupUser.count({
					where: { groupId: group.id, isAccepted: true },
				});
				const images = await prisma.groupImage.findMany({
					where: { groupId: group.id },
				});
				const imageUrls = images.map((image) => {
					return image.imageUrl;
				});
				return {
					...group,
					memberCount,
					images: imageUrls,
					currentPage: page,
					totalPages: totalPages,
				};
			}),
		);
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
				groupUser: {
					where: {
						isAccepted: true,
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
				groupUser: {
					some: {
						isAccepted: false,
						isAdmin: false,
					},
				},
			},
			include: {
				groupUser: {
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
					userId: managerId,
				},
			},
			include: {
				group: true,
			},
		});
		if (!groupUser) throw new Error('가입 신청 없음');
		if (groupUser.group.managerId !== managerId) throw new Error('권한 없음');
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
		const groupUser = await prisma.groupUser.findFirst({
			where: {
				groupId: groupId,
				userId: userId,
				isAccepted: false,
			},
			include: {
				group: true,
			},
		});
		console.log(groupUser);
		if (!groupUser) throw new Error('가입 신청 없음');
		if (groupUser.group.managerId !== managerId) throw new Error('권한 없음');

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

const getGroupJoinRequestsByGroupId = async (groupId, managerId) => {
	try {
		const group = await prisma.group.findUnique({
			where: { id: groupId },
			include: {
				groupUser: {
					where: { isAccepted: false },
					include: {
						user: {
							select: {
								id: true,
								nickname: true,
							},
						},
					},
				},
			},
		});
		if (!group || group.managerId !== managerId) return null;
		return group.groupUser.map((groupUser) => groupUser.user);
	} catch (error) {
		throw error;
	}
};

const getMyGroups = async (userId, page, limit) => {
	try {
		const totalGroupsCount = await prisma.groupUser.count({
			where: {
				userId: userId,
				isAccepted: true,
			},
		});
		const totalPages = Math.ceil(totalGroupsCount / limit);
		const paginationOptions =
			page !== null && limit !== null
				? { skip: (page - 1) * limit, take: limit }
				: {};
		const groups = await prisma.groupUser.findMany({
			where: {
				userId: userId,
				isAccepted: true,
			},
			select: {
				groupId: true,
				group: {
					select: {
						id: true,
						name: true,
						managerId: true,
						goal: true,
						region: true,
						introduction: true,
						memberLimit: true,
						manager: {
							select: {
								id: true,
								name: true,
								nickname: true,
							},
						},
						groupImage: {
							select: {
								imageUrl: true,
							},
						},
						groupUser: {
							where: {
								isAccepted: true,
							},
						},
					},
				},
			},
			...paginationOptions,
		});

		return groups.map((group) => ({
			id: group.group.id,
			name: group.group.name,
			managerId: group.group.managerId,
			goal: group.group.goal,
			region: group.group.region,
			introduction: group.group.introduction,
			memberLimit: group.group.memberLimit,
			memberCount: group.group.groupUser.length,
			manager: {
				id: group.group.manager.id,
				name: group.group.manager.name,
				nickname: group.group.manager.nickname,
			},
			imageUrl: group.group.groupImage[0]?.imageUrl || null,
			currentPage: page,
			totalPages: totalPages,
		}));
	} catch (error) {
		throw error;
	}
};

const getGroupMembers = async (groupName, userId, page, limit) => {
	try {
		const group = await prisma.group.findUnique({
			where: { name: groupName },
			include: {
				groupUser: {
					where: { userId: { not: userId } },
					select: {
						user: {
							select: { nickname: true },
						},
					},
				},
			},
		});
		if (!group) {
			throw new Error('그룹을 찾을 수 없음');
		}
		const totalMembersCount = await prisma.groupUser.count({
			where: { groupId: group.id },
		});
		const totalPages = Math.ceil(totalMembersCount / limit);
		const paginationOptions =
			page !== null && limit !== null
				? { skip: (page - 1) * limit, take: limit }
				: {};
		const groupMembers = await prisma.groupUser.findMany({
			where: { groupId: group.id },
			select: {
				user: {
					select: { nickname: true },
				},
			},
			...paginationOptions,
		});
		return {
			members: groupMembers.map((groupUser) => groupUser.user.nickname),
			currentPage: page,
			totalPages: totalPages,
		};
	} catch (error) {
		throw error;
	}
};

const createPost = async (userId, groupId, title, content, isNotice) => {
	try {
		console.log(userId, groupId, title, content, isNotice);
		const groupUser = await groupUtils.getGroupUser(userId, groupId);
		if (!groupUser) throw new Error('그룹 구성원 아님');
		const isManager = await groupUtils.isGroupManager(userId, groupId);
		if (isNotice && !isManager) throw new Error('권한 없음');
		const postData = {
			writer: { connect: { id: userId } },
			group: { connect: { id: groupId } },
			title,
			content,
			isNotice,
		};
		return await prisma.post.create({
			data: postData,
		});
	} catch (error) {
		throw error;
	}
};

const getAllPosts = async (groupId, page, limit) => {
	try {
		const totalPostsCount = await prisma.post.count({
			where: { groupId },
		});
		const totalPages = Math.ceil(totalPostsCount / limit);

		const paginationOptions =
			page !== null && limit !== null
				? { skip: (page - 1) * limit, take: limit }
				: {};

		const posts = await prisma.post.findMany({
			where: { groupId },
			...paginationOptions,
		});
		return {
			posts,
			currentPage: page,
			totalPages: totalPages,
		};
	} catch (error) {
		throw error;
	}
};

const getPostById = async (postId) => {
	try {
		const post = await prisma.post.findUnique({
			where: {
				id: postId,
			},
			include: {
				writer: {
					select: {
						id: true,
						nickname: true,
					},
				},
				comments: {
					include: {
						writer: {
							select: {
								nickname: true,
							},
						},
					},
				},
			},
		});
		if (!post) {
			throw new Error('게시글 없음');
		}
		const { writer, comments, ...restPost } = post;
		const commentDetails = comments.map((comment) => ({
			...comment,
			commenterNickname: comment.writer.nickname,
			writer: undefined,
		}));
		return {
			...restPost,
			authorNickname: writer.nickname,
			comments: commentDetails,
		};
	} catch (error) {
		throw error;
	}
};

const getRecentPosts = async (userId, page, limit) => {
	try {
		const paginationOptions =
			page !== null && limit !== null
				? { skip: (page - 1) * limit, take: limit }
				: {};
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
		const totalPostsCount = await prisma.post.count({
			where: { groupId: { in: groupIds } },
		});
		const totalPages = Math.ceil(totalPostsCount / limit);
		const posts = await prisma.post.findMany({
			where: { groupId: { in: groupIds } },
			orderBy: { createdAt: 'desc' },
			...paginationOptions,
		});

		return {
			posts,
			currentPage: page,
			totalPages: totalPages,
		};
	} catch (error) {
		throw error;
	}
};

const editPost = async (postId, userId, postData) => {
	try {
		const post = await prisma.post.findUnique({ where: { id: postId } });
		if (!post) throw new Error('존재하지 않는 게시글');
		if (post.writerId !== userId) throw new Error('권한이 없음');
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
		if (!post) throw new Error('존재하지 않는 게시글');
		const isAdmin = await groupUtils.isUserGroupAdmin(userId, post.groupId);
		if (post.writerId !== userId && !isAdmin) throw new Error('권한이 없음');

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
		const group = await prisma.group.findUnique({ where: { id: groupId } });
		if (!group) throw new Error('그룹을 찾을 수 없음');
		const groupName = group.name;

		const posts = await prisma.post.findMany({ where: { groupId } });
		for (let post of posts) {
			const postImages = await prisma.postImage.findMany({
				where: { postId: post.id },
			});
			for (let image of postImages) {
				fs.unlinkSync(path.join(__dirname, '../..', 'public', image.imageUrl));
			}
			await prisma.postImage.deleteMany({ where: { postId: post.id } });
			await prisma.comment.deleteMany({ where: { postId: post.id } });
			await prisma.post.delete({ where: { id: post.id } });
		}

		const certPosts = await prisma.certPost.findMany({
			where: { groupName: groupName },
		});
		for (let certPost of certPosts) {
			const certPostImages = await prisma.certPostImage.findMany({
				where: { certPostId: certPost.id },
			});
			for (let image of certPostImages) {
				fs.unlinkSync(path.join(__dirname, '../..', 'public', image.imageUrl));
			}
			await prisma.certPostImage.deleteMany({
				where: { certPostId: certPost.id },
			});
			await prisma.certPostParticipant.deleteMany({
				where: { certPostId: certPost.id },
			});
			await prisma.comment.deleteMany({
				where: { certPostId: certPost.id },
			});
			await prisma.certPost.delete({
				where: { id: certPost.id },
			});
		}
		const groupImages = await prisma.groupImage.findMany({
			where: { groupId },
		});
		for (let image of groupImages) {
			fs.unlinkSync(path.join(__dirname, '../..', 'public', image.imageUrl));
		}
		await prisma.groupUser.deleteMany({ where: { groupId } });
		await prisma.groupImage.deleteMany({ where: { groupId } });
		await prisma.group.deleteMany({ where: { id: groupId } });
	} catch (error) {
		throw error;
	}
};

const getGroupByPostId = async (postId) => {
	return prisma.group.findFirst({
		where: { post: { some: { id: postId } } },
	});
};

const getGroupUserByUserIdAndGroupId = async (userId, groupId) => {
	return prisma.groupUser.findUnique({
		where: {
			userId_groupId: {
				userId: userId,
				groupId: groupId,
			},
		},
	});
};

const getUserGroupCertPosts = async (userId, page, limit) => {
	try {
		const userGroups = await prisma.groupUser.findMany({
			where: { userId: userId, isAccepted: true },
			select: { groupId: true },
		});
		const groupIds = userGroups.map((group) => group.groupId);
		const groups = await prisma.group.findMany({
			where: { id: { in: groupIds } },
			select: { name: true },
		});
		const groupNames = groups.map((group) => group.name);

		const totalPostsCount = await prisma.certPost.count({
			where: { groupName: { in: groupNames }, isGroupPost: true },
		});
		const totalPages = Math.ceil(totalPostsCount / limit);
		const paginationOptions =
			page !== null && limit !== null
				? { skip: (page - 1) * limit, take: limit }
				: {};
		const posts = await prisma.certPost.findMany({
			where: { groupName: { in: groupNames }, isGroupPost: true },
			orderBy: { createdAt: 'desc' },
			...paginationOptions,
		});
		return { posts: posts, currentPage: page, totalPages: totalPages };
	} catch (error) {
		throw error;
	}
};

const getCertPostsByGroupName = async (groupName, page, limit) => {
	try {
		const paginationOptions =
			(page !== null) & (limit !== null)
				? { skip: (page - 1) * limit, take: limit }
				: {};
		const certPosts = await prisma.certPost.findMany({
			where: { groupName, isGroupPost: true },
			orderBy: { createdAt: 'desc' },
			include: {
				images: true,
				comments: true,
				participants: true,
			},
			...paginationOptions,
		});

		if (certPosts.length === 0) {
			throw new Error('인증게시글 없음');
		}

		return certPosts.map((certPost) => {
			const participantNicknames = certPost.participants.map(
				(participant) => participant.participant,
			);
			return {
				...certPost,
				participants: participantNicknames,
			};
		});
	} catch (error) {
		throw error;
	}
};

module.exports = {
	createGroup,
	getAllGroups,
	getGroupDetails,
	isUserGroupMember,
	requestToJoinGroup,
	acceptRegistration,
	getMyGroups,
	createPost,
	getAllPosts,
	getPostById,
	editPost,
	deletePost,
	deleteComment,
	leaveGroup,
	isUserGroupAdmin,
	removeGroupMember,
	dropGroup,
	rejectGroupJoinRequest,
	getGroupJoinRequests,
	getRecentPosts,
	getGroupByPostId,
	getGroupUserByUserIdAndGroupId,
	getGroupJoinRequestsByGroupId,
	getGroupMembers,
	getUserGroupCertPosts,
	getCertPostsByGroupName,
};

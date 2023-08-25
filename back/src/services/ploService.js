const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createCertPost = async (userId, certPostData) => {
	try {
		const participants = certPostData.participants || [];
		console.log(certPostData.groupName);
		if (certPostData.isGroupPost && certPostData.groupName) {
			const group = await prisma.group.findUnique({
				where: {
					name: certPostData.groupName,
				},
				select: {
					id: true,
				},
			});
			if (!group) {
				throw new Error('그룹이 존재하지 않음');
			}
			const userInGroup = await prisma.groupUser.findFirst({
				where: {
					groupId: group.id,
					userId: userId,
				},
			});
			if (!userInGroup) {
				throw new Error('그룹에 속해있지 않음');
			}
		}

		return await prisma.certPost.create({
			data: {
				...certPostData,
				writerId: userId,
				participants: {
					create: participants.map((participant) => ({
						participant,
					})),
				},
			},
		});
	} catch (error) {
		throw error;
	}
};

const getAllCertPosts = async () => {
	try {
		const certPosts = await prisma.certPost.findMany({
			include: {
				images: {
					select: {
						imageUrl: true,
					},
				},
				participants: {
					select: {
						participant: true,
					},
				},
			},
		});

		return certPosts.map((certPost) => {
			const imageUrls = certPost.images.map((image) => image.imageUrl);
			const participants = certPost.participants.map(
				(participant) => participant.participant,
			);
			return {
				...certPost,
				images: imageUrls,
				participants: participants,
			};
		});
	} catch (error) {
		throw error;
	}
};

const getCertPostDetails = async (certPostId) => {
	try {
		const certPost = await prisma.certPost.findUnique({
			where: {
				id: certPostId,
			},
			include: {
				images: {
					select: {
						imageUrl: true,
					},
				},
				participants: {
					select: {
						participant: true,
					},
				},
			},
		});
		if (!certPost) {
			throw new Error('인증게시글이 없음');
		}
		const imageUrls = certPost.images.map((image) => image.imageUrl);
		const participants = certPost.participants.map(
			(participant) => participant.participant,
		);
		return {
			...certPost,
			images: imageUrls,
			participants: participants,
		};
	} catch (error) {
		throw error;
	}
};

const updateCertPost = async (certPostId, certPostData) => {
	try {
		const { participants, ...updatedFields } = certPostData;
		const updateData = { ...updatedFields };

		if (participants !== undefined) {
			await prisma.certPostParticipant.deleteMany({
				where: { certPostId: certPostId },
			});

			const newParticipants = participants.map((participant) => ({
				participant: participant,
				certPostId: certPostId,
			}));

			await prisma.certPostParticipant.createMany({
				data: newParticipants,
			});
		}

		return await prisma.certPost.update({
			where: { id: certPostId },
			data: updateData,
		});
	} catch (error) {
		throw error;
	}
};
const deleteCertPostImages = async (certPostId) => {
	try {
		await prisma.certPostImage.deleteMany({
			where: { certPostId: certPostId },
		});
	} catch (error) {
		throw error;
	}
};

const deleteCertPostParticipants = async (certPostId) => {
	try {
		await prisma.certPostParticipant.deleteMany({
			where: { certPostId: certPostId },
		});
	} catch (error) {
		throw error;
	}
};

const deleteCertPost = async (certPostId) => {
	try {
		await prisma.certPost.delete({
			where: { id: certPostId },
		});
	} catch (error) {
		throw error;
	}
};

const getTopCertPostContributorsUsers = async () => {
	try {
		const certPosts = await prisma.certPost.findMany({
			select: {
				writerId: true,
			},
		});

		const userCounts = certPosts.reduce((acc, post) => {
			acc[post.writerId] = (acc[post.writerId] || 0) + 1;
			return acc;
		}, {});

		// Get the top 5 users
		const topUserIds = Object.keys(userCounts)
			.sort((a, b) => userCounts[b] - userCounts[a])
			.slice(0, 5);

		const topUsers = [];
		for (let userId of topUserIds) {
			const userDetails = await prisma.user.findUnique({
				where: { id: parseInt(userId) },
			});
			userDetails.score = userCounts[userId] * 350;
			topUsers.push(userDetails);
		}

		return topUsers;
	} catch (error) {
		throw error;
	}
};

const getTopCertPostContributorsGroups = async () => {
	try {
		const certPosts = await prisma.certPost.findMany({
			select: {
				groupName: true,
			},
		});

		const groupCounts = certPosts.reduce((acc, post) => {
			acc[post.groupName] = (acc[post.groupName] || 0) + 1;
			return acc;
		}, {});

		const topGroupNames = Object.keys(groupCounts)
			.sort((a, b) => groupCounts[b] - groupCounts[a])
			.slice(0, 5);

		const topGroups = [];
		for (let groupName of topGroupNames) {
			let groupDetails = await prisma.group.findUnique({
				where: { name: groupName },
			});

			if (groupDetails) {
				groupDetails.score = groupCounts[groupName] * 350;
				topGroups.push(groupDetails);
			}
		}
		return topGroups;
	} catch (error) {
		throw error;
	}
};

module.exports = {
	createCertPost,
	getAllCertPosts,
	getCertPostDetails,
	updateCertPost,
	deleteCertPostImages,
	deleteCertPostParticipants,
	deleteCertPost,
	getTopCertPostContributorsUsers,
	getTopCertPostContributorsGroups,
};

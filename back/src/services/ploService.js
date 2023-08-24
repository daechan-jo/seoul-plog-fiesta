const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createCertPost = async (userId, certPostData) => {
	try {
		const participants = certPostData.participants || [];
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

const updateCertPost = async (userId, certPostId, updatedFields) => {
	try {
		const certPost = await prisma.certPost.findUnique({
			where: { id: certPostId },
		});

		if (certPost.writerId !== userId) {
			return null;
		}

		const currentParticipants = await prisma.certPostParticipant.findMany({
			where: { certPostId },
		});
		const updatedParticipants = updatedFields.participants || [];

		const upsertParticipants = updatedParticipants.map((participant) => {
			const currentParticipant = currentParticipants.find(
				(p) => p.participant === participant,
			);
			if (currentParticipant) {
				return {
					where: { id: currentParticipant.id },
					update: { participant },
				};
			} else {
				return {
					where: { participant },
					create: { participant, certPostId },
					update: {},
				};
			}
		});

		delete updatedFields.participants;

		return await prisma.certPost.update({
			where: { id: certPostId },
			data: {
				...updatedFields,
				participants: {
					upsert: upsertParticipants,
				},
			},
			include: {
				participants: true,
			},
		});
	} catch (error) {
		throw error;
	}
};

module.exports = {
	createCertPost,
	getAllCertPosts,
	getCertPostDetails,
	updateCertPost,
};

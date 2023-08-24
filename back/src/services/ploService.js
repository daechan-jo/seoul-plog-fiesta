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

module.exports = {
	createCertPost,
	getAllCertPosts,
	getCertPostDetails,
	updateCertPost,
	deleteCertPostImages,
	deleteCertPostParticipants,
	deleteCertPost,
};

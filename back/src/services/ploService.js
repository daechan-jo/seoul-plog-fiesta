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

module.exports = { createCertPost, getAllCertPosts, getCertPostDetails };

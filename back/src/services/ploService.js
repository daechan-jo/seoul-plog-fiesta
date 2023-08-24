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
			select: {
				id: true,
				images: {
					select: {
						imageUrl: true,
					},
				},
			},
		});

		return await Promise.all(
			certPosts.map(async (certPost) => {
				const imageUrls = certPost.images.map((image) => {
					return image.imageUrl;
				});

				return {
					...certPost,
					images: imageUrls,
				};
			}),
		);
	} catch (error) {
		throw error;
	}
};

module.exports = { createCertPost, getAllCertPosts };

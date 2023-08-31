const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const fs = require('fs');
const path = require('path');

const deleteImagesByPostId = async (postId) => {
	try {
		const image = await prisma.postImage.findFirst({
			where: {
				postId: postId,
			},
		});
		if (image)
			await fs.unlinkSync(
				path.join(__dirname, '../..', 'public', image.imageUrl),
			);
		await prisma.postImage.deleteMany({
			where: {
				postId: postId,
			},
		});
	} catch (error) {
		console.error(error);
		throw error;
	}
};

module.exports = { deleteImagesByPostId };

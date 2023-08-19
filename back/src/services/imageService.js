const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const fs = require("fs");
const path = require("path");
const { promisify } = require("util");
const unlinkAsync = promisify(fs.unlink);

const deleteImagesByPostId = async (postId) => {
	const image = await prisma.postImage.findFirst({
		where: {
			postId: postId,
		},
	});
	if (!image) return;
	const imagePath = path.join(__dirname, "..", image.imageUrl);
	try {
		await unlinkAsync(imagePath);
	} catch (error) {
		throw error;
	}
	await prisma.postImage.deleteMany({
		where: {
			postId: postId,
		},
	});
};

module.exports = { deleteImagesByPostId };

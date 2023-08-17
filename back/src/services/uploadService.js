const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const uploadProfileImage = async (userId, imagePath) => {
	await prisma.userProfileImage.deleteMany({
		where: {
			user: {
				id: userId,
			},
		},
	});
	const [newImage] = await Promise.all([
		prisma.userProfileImage.create({
			data: {
				imageUrl: imagePath,
				user: {
					connect: { id: userId },
				},
			},
		}),
	]);

	return newImage;
};

module.exports = {
	uploadProfileImage,
};

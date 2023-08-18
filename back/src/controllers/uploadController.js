const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const path = require("path");
// const fs = require("fs");

const uploadProfileImage = async (req, res, next) => {
	const userId = req.user.id;
	try {
		const existingImage = await prisma.userProfileImage.findUnique({
			where: {
				userId,
			},
		});
		const imageUrl = path.join("./uploads/profileImage", req.file.filename);
		if (existingImage) {
			// const oldImageFilePath = path.join(
			// 	"./uploads/profileImage",
			// 	existingImage.imageUrl,
			// );
			// fs.unlinkSync(oldImageFilePath);
			await prisma.userProfileImage.update({
				where: {
					id: existingImage.id,
				},
				data: {
					imageUrl,
				},
			});
		} else {
			await prisma.userProfileImage.create({
				data: {
					imageUrl,
					userId,
				},
			});
		}
		res.status(201).json({ message: "프로필 이미지 업로드 성공" });
	} catch (error) {
		console.error(error);
		error.status = 500;
		next(error);
	}
};

const uploadPostImage = async (req, res, next) => {
	const userId = req.user.id;
	console.log(userId);
	try {
		const postId = parseInt(req.body.postId);

		const post = await prisma.post.findUnique({ where: { id: postId } });
		if (!post)
			return res
				.status(404)
				.json({ message: "게시글이 존재하지 않습니다." });
		if (post.writerId !== userId)
			return res
				.status(403)
				.json({ message: "게시글 작성자가 아닙니다." });

		const imageUrl = path.join("./uploads/postImage", req.file.filename);
		await prisma.postImage.create({
			data: {
				imageUrl,
				postId,
			},
		});
		res.status(201).json({ message: "게시글 이미지 업로드 성공" });
	} catch (error) {
		console.error(error);
		error.status = 500;
		next(error);
	}
};

module.exports = {
	uploadProfileImage,
	uploadPostImage,
};

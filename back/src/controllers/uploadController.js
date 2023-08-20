const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const path = require("path");
const fs = require("fs");

const uploadProfileImage = async (req, res, next) => {
	try {
		const userId = req.user.id;
		const imageUrl = path.join("uploads/images", req.file.filename);
		const existingImage = await prisma.userProfileImage.findUnique({
			where: { userId },
		});

		if (existingImage) {
			fs.unlinkSync(existingImage.imageUrl);

			await prisma.userProfileImage.update({
				where: { id: existingImage.id },
				data: { imageUrl },
			});
		} else {
			await prisma.userProfileImage.create({
				data: {
					imageUrl,
					userId,
				},
			});
		}
		console.log("프로필 이미지 업로드 성공");
		res.status(201).json({
			message: "프로필 이미지 업로드 성공",
		});
	} catch (error) {
		console.error(error);
		error.status = 500;
		next(error);
	}
};

const uploadPostImage = async (req, res, next) => {
	try {
		const postId = parseInt(req.params.postid);
		const imageUrl = path.join("uploads/images", req.file.filename);
		const post = await prisma.post.findUnique({
			where: { id: postId },
			include: { group: true },
		});

		if (!post) return res.status(404).json({ message: "게시글 없음" });

		const existingImage = await prisma.postImage.findFirst({
			where: { postId: post.id },
		});
		if (existingImage) {
			fs.unlinkSync(existingImage.imageUrl);

			await prisma.postImage.update({
				where: { id: existingImage.id },
				data: { imageUrl },
			});
		} else {
			await prisma.postImage.create({
				data: {
					imageUrl,
					post: { connect: { id: postId } },
				},
			});
		}
		console.log("게시글 이미지 업로드 성공");
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

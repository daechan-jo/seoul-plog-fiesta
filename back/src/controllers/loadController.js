import path from "path";
import fs from "fs";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const loadProfileImage = async (req, res, next) => {
	const userId = req.user.id;
	try {
		const userProfileImage = await prisma.userProfileImage.findUnique({
			where: { userId },
		});
		if (!userProfileImage) {
			return res
				.status(404)
				.json({ message: "등록된 프로필 이미지가 없습니다" });
		}
		res.status(200).json({ imageUrl: userProfileImage.imageUrl });
	} catch (error) {
		console.error(error);
		error.status = 500;
		next(error);
	}
};

const loadPostImage = async (req, res, next) => {
	const postId = parseInt(req.params.postid);

	try {
		const postImage = await prisma.postImage.findFirst({
			where: { postId },
		});

		if (!postImage) {
			return res.status(404).send("이미지가 없습니다");
		}
		const imagePath = path.join(__dirname, "..", "..", postImage.imageUrl);
		console.log("postImage.imageUrl:", postImage.imageUrl);
		console.log("imagePath:", imagePath);

		fs.access(imagePath, fs.constants.F_OK, (err) => {
			if (err) {
				console.error("파일에 접근할 수 없음:", err);
				return res.status(404).send("이미지 파일이 없습니다.");
			}
			res.sendFile(imagePath);
		});
	} catch (error) {
		console.error(error);
		error.status = 500;
		next(error);
	}
};

module.exports = { loadProfileImage, loadPostImage };

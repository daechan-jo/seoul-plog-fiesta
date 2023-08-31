import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const loadProfileImage = async (req, res, next) => {
	try {
		const userId = parseInt(req.params.userid);
		const userProfileImage = await prisma.userProfileImage.findUnique({
			where: { userId },
		});
		if (!userProfileImage) {
			return res.status(404).json({ message: '등록된 프로필 이미지 없음' });
		}
		const imageUrl = userProfileImage.imageUrl;
		res.json(imageUrl);
	} catch (error) {
		console.error(error);
		error.status = 500;
		next(error);
	}
};

const loadPostImage = async (req, res, next) => {
	try {
		const postId = parseInt(req.params.postid);
		const postImage = await prisma.postImage.findFirst({
			where: { postId },
		});
		if (!postImage) {
			return res.status(404).json({ message: '게시글 찾을 수 없음' });
		}
		const imageUrl = postImage.imageUrl;
		res.json(imageUrl);
	} catch (error) {
		console.error(error);
		error.status = 500;
		next(error);
	}
};

const loadGroupImage = async (req, res, next) => {
	try {
		const groupId = parseInt(req.params.groupid);
		const groupImage = await prisma.groupImage.findFirst({
			where: { groupId },
		});
		if (!groupImage) {
			return res
				.status(404)
				.json({ message: '등록된 그룹 이미지 찾을 수 없음' });
		}
		const imageUrl = groupImage.imageUrl;
		res.json(imageUrl);
	} catch (error) {
		console.error(error);
		error.status = 500;
		next(error);
	}
};

const loadCertPostImage = async (req, res, next) => {
	try {
		const certPostId = parseInt(req.params.certid);
		const certPostImage = await prisma.certPostImage.findFirst({
			where: { certPostId },
		});

		if (!certPostImage) {
			return res.status(404).json({ message: '게시글 찾을 수 없음' });
		}
		const imageUrl = certPostImage.imageUrl;
		res.json(imageUrl);
	} catch (error) {
		console.error(error);
		error.status = 500;
		next(error);
	}
};

module.exports = {
	loadProfileImage,
	loadPostImage,
	loadGroupImage,
	loadCertPostImage,
};

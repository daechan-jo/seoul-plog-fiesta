import path from 'path';
import fs from 'fs';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const loadProfileImage = async (req, res, next) => {
	try {
		const userId = req.user.id;
		const userProfileImage = await prisma.userProfileImage.findUnique({
			where: { userId },
		});
		if (!userProfileImage) {
			return res
				.status(404)
				.json({ message: '등록된 프로필 이미지가 없습니다' });
		}
		const imagePath = path.join(__dirname, '..', userProfileImage.imageUrl);

		fs.access(imagePath, fs.constants.F_OK, (err) => {
			if (err) {
				console.error('파일에 접근할 수 없음:', err);
				return res.status(404).send('이미지 파일이 없습니다.');
			}
		});
		console.log(imagePath);
		res.sendfile(imagePath);
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
			return res.status(404).send('이미지가 없습니다');
		}
		const imagePath = path.join(__dirname, '..', postImage.imageUrl);

		fs.access(imagePath, fs.constants.F_OK, (err) => {
			if (err) {
				console.error('파일에 접근할 수 없음:', err);
				return res.status(404).send('이미지 파일이 없습니다.');
			}
			console.log(imagePath);
			res.sendFile(imagePath);
		});
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
				.json({ message: '등록된 그룹 이미지가 없습니다.' });
		}
		const imagePath = path.join(__dirname, '..', groupImage.imageUrl);
		fs.access(imagePath, fs.constants.F_OK, (err) => {
			if (err) {
				console.error('파일에 접근할 수 없음:', err);
				return res.status(404).send('이미지 파일이 없습니다.');
			}
		});
		console.log(imagePath);
		res.sendfile(imagePath);
	} catch (error) {
		console.error(error);
		error.status = 500;
		next(error);
	}
};

module.exports = { loadProfileImage, loadPostImage, loadGroupImage };

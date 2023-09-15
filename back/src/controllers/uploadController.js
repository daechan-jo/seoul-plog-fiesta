const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const path = require('path');
const fs = require('fs');

const uploadProfileImage = async (req, res, next) => {
  /**
   * #swagger.tags = ['Upload']
   * #swagger.summary = '프로필 이미지 업로드'
   * #swagger.description = '유저의 이미지가 이미 로컬에 저장되어있다면 삭제 후 재등록. DB에 이미지 경로 업데이트'
   */
  try {
    const userId = req.user.id;
    const newImagePath = path.join('images', req.file.filename);
    const user = await prisma.userProfileImage.findUnique({
      where: { userId },
    });

    if (user.imagePath) {
      const absoluteImagePath = path.join(
        __dirname,
        '../..',
        'public',
        user.imagePath,
      );
      fs.unlinkSync(absoluteImagePath);
    }
    await prisma.user.update({
      where: { id: userId },
      data: { imagePath: newImagePath },
    });
    return res.status(201).json(newImagePath);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const uploadPostImage = async (req, res, next) => {
  /**
   * #swagger.tags = ['Upload']
   * #swagger.summary = '게시글 이미지 업로드'
   * #swagger.description = '게시글의 이미지가 이미 로컬에 저장되어있다면 삭제 후 재등록. DB에 이미지 경로 업데이트'
   */
  try {
    const postId = parseInt(req.params.postid);
    const newImagePath = path.join('images', req.file.filename);
    const post = await prisma.post.findUnique({
      where: { id: postId },
      include: { group: true },
    });

    if (post.imagePath) {
      const absoluteImagePath = path.join(
        __dirname,
        '../..',
        'public',
        post.imagePath,
      );
      fs.unlinkSync(absoluteImagePath);
    }

    await prisma.post.update({
      where: { id: postId },
      data: { imagePath: newImagePath },
    });

    return res.status(201).json(newImagePath);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const uploadCertImage = async (req, res, next) => {
  /**
   * #swagger.tags = ['Upload']
   * #swagger.summary = '인증게시글 이미지 업로드'
   * #swagger.description = '인증게시글 이미지가 이미 로컬에 저장되어있다면 삭제 후 재등록. DB에 이미지 경로 업데이트'
   */
  try {
    const certPostId = parseInt(req.params.postid);
    const newImagePath = path.join('images', req.file.filename);
    const certPost = await prisma.certPost.findUnique({
      where: { id: certPostId },
    });

    if (certPost.imagePath) {
      const absoluteImagePath = path.join(
        __dirname,
        '../..',
        'public',
        certPost.imagePath,
      );
      fs.unlinkSync(absoluteImagePath);
    }

    await prisma.certPost.update({
      where: { id: certPostId },
      data: { imagePath: newImagePath },
    });

    return res.status(201).json(newImagePath);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const uploadGroupImage = async (req, res, next) => {
  /**
   * #swagger.tags = ['Upload']
   * #swagger.summary = '그룹 이미지 업로드'
   * #swagger.description = '그룹 이미지가 이미 로컬에 저장되어있다면 삭제 후 재등록. DB에 이미지 경로 업데이트'
   */
  try {
    const userId = req.user.id;
    const groupId = parseInt(req.params.groupid);
    const newImagePath = path.join('images', req.file.filename);
    const group = await prisma.group.findFirst({
      where: {
        AND: [{ id: groupId }, { managerId: userId }],
      },
    });
    if (!group) {
      return res.status(403).json({ message: '잘못된 접근입니다' });
    }

    if (group.imagePath) {
      const absoluteImagePath = path.join(
        __dirname,
        '../..',
        'public',
        group.imagePath,
      );
      fs.unlinkSync(absoluteImagePath);
    }
    await prisma.groupImage.update({
      where: { id: groupId },
      data: { newImagePath },
    });

    return res.status(201).json(newImagePath);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports = {
  uploadProfileImage,
  uploadPostImage,
  uploadGroupImage,
  uploadCertImage,
};

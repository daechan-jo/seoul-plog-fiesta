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
    const imageUrl = path.join('images', req.file.filename);
    const existingImage = await prisma.userProfileImage.findUnique({
      where: { userId },
    });

    if (existingImage) {
      const absoluteImagePath = path.join(
        __dirname,
        '../..',
        'public',
        existingImage.imageUrl,
      );
      fs.unlinkSync(absoluteImagePath);

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
    return res.status(201).json(imageUrl);
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
    const imageUrl = path.join('images', req.file.filename);
    const post = await prisma.post.findUnique({
      where: { id: postId },
      include: { group: true },
    });

    if (!post) {
      return res.status(404).json({ message: '게시글 없음' }); // Corrected line
    }

    const existingImage = await prisma.postImage.findFirst({
      where: { postId: post.id },
    });

    if (existingImage) {
      fs.unlinkSync(
        path.join(__dirname, '../..', 'public', existingImage.imageUrl),
      );

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
    return res.status(201).json(imageUrl);
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
    const imageUrl = path.join('images', req.file.filename);
    const certPost = await prisma.certPost.findUnique({
      where: { id: certPostId },
    });
    if (!certPost) {
      return res.status(404).json({ message: '인증 게시글 없음' });
    }
    const existingImage = await prisma.certPostImage.findFirst({
      where: { certPostId: certPost.id },
    });
    if (existingImage) {
      fs.unlinkSync(
        path.join(__dirname, '../..', 'public', existingImage.imageUrl),
      );
      await prisma.certPostImage.update({
        where: { id: existingImage.id },
        data: { imageUrl },
      });
    } else {
      await prisma.certPostImage.create({
        data: {
          imageUrl,
          certPost: { connect: { id: certPostId } },
        },
      });
    }
    return res.status(201).json(imageUrl);
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
    const isGroupAdmin = await prisma.group.findFirst({
      where: {
        AND: [{ id: groupId }, { managerId: userId }],
      },
    });
    if (!isGroupAdmin) {
      return res.status(403).json({ message: '관리자 권한' });
    }
    const imageUrl = path.join('images', req.file.filename);
    const existingImage = await prisma.groupImage.findFirst({
      where: { groupId },
    });
    if (existingImage) {
      const absoluteImagePath = path.join(
        __dirname,
        '../..',
        'public',
        existingImage.imageUrl,
      );
      fs.unlinkSync(absoluteImagePath);
      await prisma.groupImage.update({
        where: { id: existingImage.id },
        data: { imageUrl },
      });
    } else {
      await prisma.groupImage.create({
        data: {
          imageUrl,
          groupId,
        },
      });
    }
    return res.status(201).json(imageUrl);
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

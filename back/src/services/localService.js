const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
import fs from 'fs';
import path from 'path';

const createFilePath = (image) => {
  return path.join(__dirname, '../../', 'public', image.imageUrl);
};

const LocalStorageClearByDropGroup = async (groupId) => {
  const group = await prisma.group.findUnique({ where: { id: groupId } });
  if (!group) throw new Error('그룹을 찾을 수 없음');

  try {
    const groupName = group.name;

    const posts = await prisma.post.findMany({
      where: { groupId },
      include: { postImages: true },
    });

    const certPosts = await prisma.certPost.findMany({
      where: { groupName },
      include: { certPostImages: true },
    });

    const groupImage = await prisma.groupImage.findUnique({
      where: { groupId },
    });

    let imageFilesToDelete = [];

    if (groupImage) {
      imageFilesToDelete.push(createFilePath(groupImage));
    }

    for (let post of posts) {
      for (let image of post.postImages) {
        imageFilesToDelete.push(createFilePath(image));
      }
    }

    for (let certPost of certPosts) {
      for (let image of certPost.certPostImages) {
        imageFilesToDelete.push(createFilePath(image));
      }
    }

    for (let filePath of imageFilesToDelete) {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const LocalStorageClearByDropUser = async (userId) => {
  try {
    const groups = await prisma.group.findMany({
      where: { managerId: userId },
    });

    const posts = await prisma.post.findMany({
      where: { writerId: userId },
    });

    const certPosts = await prisma.certPost.findMany({
      where: { writerId: userId },
    });

    const user = await prisma.user.findUnique({
      where: { userId },
    });

    let imageFilesToDelete = [];

    if (user) {
      imageFilesToDelete.push(
        path.join(__dirname, '../../', 'public', user.imagePath),
      );
    }

    for (let group of groups) {
      if (group.imagePath) {
        imageFilesToDelete.push(
          path.join(__dirname, '../../', 'public', group.imagePath),
        );
      }
    }

    for (let post of posts) {
      if (post.imagePath) {
        imageFilesToDelete.push(
          path.join(__dirname, '../../', 'public', post.imagePath),
        );
      }
    }

    for (let certPost of certPosts) {
      if (certPost.imagePath) {
        imageFilesToDelete.push(
          path.join(__dirname, '../../', 'public', certPost.imagePath),
        );
      }
    }

    for (let filePath of imageFilesToDelete) {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = { LocalStorageClearByDropGroup, LocalStorageClearByDropUser };

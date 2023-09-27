import { PrismaClient } from '@prisma/client';

import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

const createFilePath = (image) =>
  path.join(__dirname, '../../', 'public', image.imageUrl);

const LocalStorageClearByDropGroup = async (groupId) => {
  const group = await prisma.group.findUnique({ where: { id: groupId } });
  if (!group) throw new Error('그룹을 찾을 수 없음');

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

  const imageFilesToDelete = [
    ...(groupImage && createFilePath(groupImage)),
    ...posts.map((post) => createFilePath(post.postImages)),
    ...certPosts.map((certPost) => createFilePath(certPost.certPostImages)),
  ];

  for (const filePath of imageFilesToDelete) {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }
};

// 지정된 사용자 ID와 관련된 로컬 스토리지에 저장된 이미지 파일을 삭제하는 함수
const LocalStorageClearByDropUser = async (userId) => {
  // 지정된 사용자 ID와 관련된 그룹, 게시물, 인증 게시물, 사용자를 가져온다.
  const [groups, posts, certPosts, user] = await Promise.all([
    prisma.group.findMany({ where: { managerId: userId } }),
    prisma.post.findMany({ where: { writerId: userId } }),
    prisma.certPost.findMany({ where: { writerId: userId } }),
    prisma.user.findUnique({ where: { id: userId } }),
  ]);

  // 삭제할 이미지 파일 목록을 만든다.
  const imageFilesToDelete = [
    ...(user.imagePath &&
      path.join(__dirname, '../../', 'public', user.imagePath)),
    ...groups.map(
      (group) =>
        group.imagePath &&
        path.join(__dirname, '../../', 'public', group.imagePath),
    ),
    ...posts.map(
      (post) =>
        post.imagePath &&
        path.join(__dirname, '../../', 'public', post.imagePath),
    ),
    ...certPosts.map(
      (certPost) =>
        certPost.imagePath &&
        path.join(__dirname, '../../', 'public', certPost.imagePath),
    ),
  ];

  for (const filePath of imageFilesToDelete) {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }
};

export default { LocalStorageClearByDropGroup, LocalStorageClearByDropUser };

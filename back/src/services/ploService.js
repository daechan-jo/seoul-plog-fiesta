import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

const createCertPost = async (userId, certPostData) => {
  const participants = certPostData.participants || [];
  if (certPostData.isGroupPost && certPostData.groupName) {
    const group = await prisma.group.findUnique({
      where: {
        name: certPostData.groupName,
      },
      select: {
        id: true,
      },
    });
    if (!group) throw new Error('그룹이 존재하지 않음');

    const userInGroup = await prisma.groupUser.findFirst({
      where: {
        groupId: group.id,
        userId,
      },
    });
    if (!userInGroup) throw new Error('그룹에 속해있지 않음');
  }
  return prisma.certPost.create({
    data: {
      ...certPostData,
      writerId: userId,
      participants: {
        create: participants.map((participant) => ({
          participant,
        })),
      },
    },
  });
};

const getAllCertPosts = async (page, limit) => {
  const paginationOptions =
    page !== null && limit !== null
      ? { skip: (page - 1) * limit, take: limit }
      : {};
  const totalCertPostCount = await prisma.certPost.count();
  const totalPages = Math.ceil(totalCertPostCount / limit);
  const certPosts = await prisma.certPost.findMany({
    include: {
      participants: {
        select: {
          participant: true,
        },
      },
      comments: true,
    },
    orderBy: { createdAt: 'desc' },
    ...paginationOptions,
  });
  const posts = certPosts.map((certPost) => {
    const participants = certPost.participants.map(
      (participant) => participant.participant,
    );
    const comments = certPost.comments.map((comment) => ({
      id: comment.id,
      content: comment.content,
      writerId: comment.writerId,
      createdAt: comment.createdAt,
    }));
    return {
      ...certPost,
      imagePath: certPost.imagePath ? [certPost.imagePath] : [],
      comments,
      participants,
    };
  });
  return {
    posts,
    currentPage: page,
    totalPages,
  };
};

const getCertPostDetails = async (certPostId) => {
  const certPost = await prisma.certPost.findUnique({
    where: {
      id: certPostId,
    },
    include: {
      writer: {
        select: {
          nickname: true,
        },
      },
      participants: {
        select: {
          participant: true,
        },
      },
      comments: {
        include: {
          writer: {
            select: {
              nickname: true,
            },
          },
        },
      },
    },
  });
  if (!certPost) throw new Error('인증게시글이 없음');

  const participants = certPost.participants.map(
    (participant) => participant.participant,
  );
  const { writer, comments, ...restCertPost } = certPost;
  const commentDetails = comments.map((comment) => ({
    ...comment,
    commenterNickname: comment.writer.nickname,
    writer: undefined,
  }));
  return {
    ...restCertPost,
    imagePath: restCertPost.imagePath ? [restCertPost.imagePath] : [],
    participants,
    authorNickname: writer.nickname,
    comments: commentDetails,
  };
};

const updateCertPost = async (certPostId, certPostData) => {
  const { participants, ...updatedFields } = certPostData;
  const updateData = { ...updatedFields };

  if (participants !== undefined) {
    await prisma.certPostParticipant.deleteMany({
      where: { certPostId },
    });

    const newParticipants = participants.map((participant) => ({
      participant,
      certPostId,
    }));

    await prisma.certPostParticipant.createMany({
      data: newParticipants,
    });
  }

  return prisma.certPost.update({
    where: { id: certPostId },
    data: updateData,
  });
};
const deleteCertPostImages = async (certPostId) => {
  const certPost = await prisma.certPost.findFirst({
    where: { id: certPostId },
  });
  if (certPost.imagePath)
    await fs.unlinkSync(
      path.join(__dirname, '../..', 'public', certPost.imagePath),
    );
};

const deleteCertPost = async (certPostId) => {
  await prisma.certPost.delete({
    where: { id: certPostId },
  });
};

const getCertPostsPersonalCount = async () => {
  const certPosts = await prisma.certPost.findMany({
    where: { isGroupPost: false },
    select: {
      writerId: true,
    },
  });
  return certPosts.reduce((acc, post) => {
    acc[post.writerId] = (acc[post.writerId] || 0) + 1;
    return acc;
  }, {});
};

const getTopMainCertPostContributors = async () => {
  const userCounts = await getCertPostsPersonalCount();
  const topUserIds = Object.keys(userCounts)
    .sort((a, b) => userCounts[b] - userCounts[a])
    .slice(0, 5);
  const topUsers = [];
  for (let i = 0; i < topUserIds.length; i += 1) {
    const userId = topUserIds[i];
    const userDetails = prisma.user.findUnique({
      where: { id: Number(userId) },
      select: {
        id: true,
        nickname: true,
        imagePath: true,
      },
    });
    userDetails.imagePath = [userDetails.imagePath] || [];
    userDetails.score = userCounts[userId] * 353;
    userDetails.rank = i + 1;
    topUsers.push(userDetails);
  }
  return topUsers;
};
const getTopCertPostContributorsUsers = async () => {
  const userCounts = await getCertPostsPersonalCount();
  const topUserIds = Object.keys(userCounts)
    .sort((a, b) => userCounts[b] - userCounts[a])
    .slice(0, 5);

  const topUsers = [];
  for (let i = 0; i < topUserIds.length; i += 1) {
    const userId = topUserIds[i];
    const userDetails = prisma.user.findUnique({
      where: { id: Number(userId) },
      select: {
        id: true,
        name: true,
        nickname: true,
        activity: true,
        imagePath: true,
      },
    });
    userDetails.score = userCounts[userId] * 353;
    userDetails.rank = i + 1;
    userDetails.postCount = userCounts[userId];
    topUsers.push(userDetails);
  }
  return topUsers;
};

const getTopCertPostContributorsGroups = async () => {
  const certPosts = await prisma.certPost.findMany({
    where: { isGroupPost: true },
    select: {
      groupName: true,
    },
  });
  const groupCounts = certPosts.reduce((acc, post) => {
    acc[post.groupName] = (acc[post.groupName] || 0) + 1;
    return acc;
  }, {});

  const topGroupNames = Object.keys(groupCounts)
    .sort((a, b) => groupCounts[b] - groupCounts[a])
    .slice(0, 5);

  const topGroups = [];
  for (let i = 0; i < topGroupNames.length; i += 1) {
    const groupName = topGroupNames[i];
    const groupDetails = prisma.group.findUnique({
      where: { name: groupName },
      select: {
        id: true,
        name: true,
        managerId: true,
        goal: true,
      },
    });
    if (groupDetails) {
      groupDetails.score = groupCounts[groupName] * 578;
      groupDetails.rank = i;
      groupDetails.postCount = groupCounts[groupName];
      topGroups.push(groupDetails);
    }
  }
  return topGroups;
};

const allCertPosts = async () =>
  prisma.certPost.findMany({
    where: { isGroupPost: false },
    select: { writerId: true },
  });

const paginate = (array, page, limit) => {
  const startIndex = (page - 1) * limit;
  return array.slice(startIndex, startIndex + limit);
};

const getTopUsers = async (page, limit) => {
  const certPosts = await allCertPosts();
  const userCounts = certPosts.reduce((acc, post) => {
    acc[post.writerId] = (acc[post.writerId] || 0) + 1;
    return acc;
  }, {});
  const totalUsersCount = Object.keys(userCounts).length;
  const totalPages = Math.ceil(totalUsersCount / limit);
  const sortedUserIds = Object.keys(userCounts).sort(
    (a, b) => userCounts[b] - userCounts[a],
  );
  let paginatedUserIds = sortedUserIds;
  if (page !== null && limit !== null)
    paginatedUserIds = paginate(sortedUserIds, page, limit);

  const topUsers = [];
  for (let i = 0; i < paginatedUserIds.length; i += 1) {
    const userId = paginatedUserIds[i];
    const userDetails = prisma.user.findUnique({
      where: { id: Number(userId) },
      select: {
        id: true,
        nickname: true,
        activity: true,
      },
    });
    if (userDetails) {
      userDetails.score = userCounts[userId] * 353;
      userDetails.rank = (page - 1) * limit + i + 1;
      userDetails.postCount = userCounts[userId];
      topUsers.push(userDetails);
    }
  }
  return {
    users: topUsers,
    currentPage: page,
    totalPages,
  };
};

const getUserRank = async (userId) => {
  const certPosts = await allCertPosts();
  const userCounts = certPosts.reduce((acc, post) => {
    acc[post.writerId] = (acc[post.writerId] || 0) + 1;
    return acc;
  }, {});
  const sortedUserIds = Object.keys(userCounts).sort(
    (a, b) => userCounts[b] - userCounts[a],
  );
  let loggedInUserRank;
  for (let i = 0; i < sortedUserIds.length; i += 1) {
    if (Number(sortedUserIds[i]) === userId) {
      loggedInUserRank = i + 1;
      break;
    }
  }
  return loggedInUserRank;
};

const getGroupRank = async (groupName) => {
  const groupPosts = await prisma.certPost.findMany({
    where: { isGroupPost: true },
    select: { groupName: true },
  });
  const groupCounts = groupPosts.reduce((acc, post) => {
    acc[post.groupName] = (acc[post.groupName] || 0) + 1;
    return acc;
  }, {});
  const sortedGroupNames = Object.keys(groupCounts).sort(
    (a, b) => groupCounts[b] - groupCounts[a],
  );
  let groupRank;
  for (let i = 0; i < sortedGroupNames.length; i += 1) {
    if (sortedGroupNames[i] === groupName) {
      groupRank = i + 1;
      break;
    }
  }
  return groupRank;
};

const getUserCertPostsRegionCount = async (userId) => {
  const userCertPosts = await prisma.certPost.findMany({
    where: { writerId: userId },
  });
  const regionCount = {};
  for (const post of userCertPosts) {
    if (!regionCount[post.region]) {
      regionCount[post.region] = 0;
    }
    regionCount[post.region] += 1;
  }
  return regionCount;
};

const getGroupCertPostsRegionCount = async (groupName) => {
  const groupCertPosts = await prisma.certPost.findMany({
    where: { groupName },
  });
  const regionCount = {};
  for (const post of groupCertPosts) {
    if (!regionCount[post.region]) {
      regionCount[post.region] = 0;
    }
    regionCount[post.region] += 1;
  }
  return regionCount;
};

const getAllCertPostsRegions = async () => {
  const regionCount = {};
  for (const post of allCertPosts) {
    if (!regionCount[post.region]) {
      regionCount[post.region] = 0;
    }
    regionCount[post.region] += 1;
  }
  return regionCount;
};

export default {
  createCertPost,
  getAllCertPosts,
  getCertPostDetails,
  updateCertPost,
  deleteCertPostImages,
  deleteCertPost,
  getTopCertPostContributorsUsers,
  getTopCertPostContributorsGroups,
  getTopUsers,
  getUserRank,
  getGroupRank,
  getUserCertPostsRegionCount,
  getGroupCertPostsRegionCount,
  getAllCertPostsRegions,
  getTopMainCertPostContributors,
};

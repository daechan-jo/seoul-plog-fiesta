const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const groupUtils = require('../utils/groupUtils');

const createGroup = async (groupData, managerId) => {
  const { name, goal, region, introduction } = groupData;
  const checkGroup = await prisma.group.findFirst({
    where: {
      name,
    },
  });
  if (checkGroup) throw new Error('이미 존재하는 그룹 이름');
  const userGroupCount = await prisma.group.count({
    where: {
      managerId: managerId,
    },
  });
  if (userGroupCount >= 5) throw new Error('그룹 생성 제한 초과');
  const createdGroup = await prisma.group.create({
    data: {
      name,
      manager: {
        connect: { id: managerId },
      },
      goal,
      region,
      introduction,
    },
  });
  const groupId = createdGroup.id;
  await prisma.groupUser.create({
    data: {
      userId: managerId,
      groupId: groupId,
      isAdmin: true,
      isAccepted: true,
    },
  });
  return createdGroup;
};

const getAllGroups = async (page, limit) => {
  const totalGroupsCount = await prisma.group.count();
  const totalPages = Math.ceil(totalGroupsCount / limit);
  const paginationOptions =
    page !== null && limit !== null
      ? { skip: (page - 1) * limit, take: limit }
      : {};
  const groups = await prisma.group.findMany({
    select: {
      id: true,
      managerId: true,
      name: true,
      goal: true,
      region: true,
      imagePath: true,
      groupUser: {
        select: {
          userId: true,
          isAccepted: true,
        },
      },
    },
    ...paginationOptions,
  });

  const formatGroups = groups.map((group) => {
    let imagePath;
    if (group.imagePath) {
      imagePath = [group.imagePath];
    } else {
      imagePath = [];
    }

    return {
      ...group,
      imagePath: imagePath,
    };
  });

  await Promise.all(
    formatGroups.map(async (group) => {
      group.memberCount = await prisma.groupUser.count({
        where: { groupId: group.id, isAccepted: true },
      });
    }),
  );

  return { groups: formatGroups, currentPage: page, totalPages: totalPages };
};

const getGroupDetails = async (groupId) => {
  return prisma.group.findUnique({
    where: {
      id: groupId,
    },
    include: {
      groupUser: {
        where: {
          isAccepted: true,
        },
        include: {
          user: true,
        },
      },
    },
  });
};

const isUserGroupAdmin = async (userId, groupId) => {
  const group = await prisma.group.findUnique({
    where: {
      id: groupId,
    },
    include: {
      manager: true,
    },
  });
  return group.managerId === userId;
};

const getGroupAndMembership = async (userId, groupId) => {
  const groupWithMemberships = await prisma.group.findUnique({
    where: {
      id: groupId,
    },
    include: {
      groupUser: {
        where: { userId },
      },
    },
  });

  return {
    group: groupWithMemberships,
    membership: groupWithMemberships?.memberships[0],
  };
};

const requestToJoinGroup = async (userId, groupId) => {
  await prisma.groupUser.create({
    data: {
      userId,
      groupId,
      isAccepted: false,
    },
  });
};

const getGroupJoinRequests = async (managerId) => {
  return prisma.group.findMany({
    where: {
      managerId: managerId,
      groupUser: {
        some: {
          isAccepted: false,
          isAdmin: false,
        },
      },
    },
    include: {
      groupUser: {
        where: {
          isAccepted: false,
          isAdmin: false,
        },
        include: {
          user: true,
        },
      },
    },
  });
};

const acceptRegistration = async (managerId, groupId, userId) => {
  const groupUser = await prisma.groupUser.findUnique({
    where: {
      userId_groupId: {
        groupId: groupId,
        userId: managerId,
      },
    },
    include: {
      group: true,
    },
  });
  if (!groupUser) throw new Error('가입 신청 없음');
  if (groupUser.group.managerId !== managerId) throw new Error('권한 없음');

  return prisma.groupUser.update({
    where: {
      userId_groupId: {
        userId: userId,
        groupId: groupId,
      },
    },
    data: {
      isAccepted: true,
    },
  });
};

const rejectGroupJoinRequest = async (managerId, groupId, userId) => {
  const groupUser = await prisma.groupUser.findFirst({
    where: {
      groupId: groupId,
      userId: userId,
      isAccepted: false,
    },
    include: {
      group: true,
    },
  });
  if (!groupUser) throw new Error('가입 신청 없음');
  if (groupUser.group.managerId !== managerId) throw new Error('권한 없음');

  await prisma.groupUser.delete({
    where: {
      userId_groupId: {
        userId: userId,
        groupId: groupId,
      },
    },
  });
  return true;
};

const getGroupJoinRequestsByGroupId = async (groupId, managerId) => {
  const group = await prisma.group.findUnique({
    where: { id: groupId },
    include: {
      groupUser: {
        where: { isAccepted: false },
        include: {
          user: {
            select: {
              id: true,
              nickname: true,
            },
          },
        },
      },
    },
  });
  if (!group || group.managerId !== managerId) return null;
  return group.groupUser.map((groupUser) => groupUser.user);
};

const getMyGroups = async (userId, page, limit) => {
  const totalGroupsCount = await prisma.groupUser.count({
    where: {
      userId: userId,
      isAccepted: true,
    },
  });
  const totalPages = Math.ceil(totalGroupsCount / limit);
  const paginationOptions =
    page !== null && limit !== null
      ? { skip: (page - 1) * limit, take: limit }
      : {};

  const groups = await prisma.groupUser.findMany({
    where: {
      userId: userId,
      isAccepted: true,
    },
    select: {
      groupId: true,
      group: {
        select: {
          id: true,
          name: true,
          managerId: true,
          goal: true,
          region: true,
          introduction: true,
          memberLimit: true,
          imagePath: true,
          manager: {
            select: {
              id: true,
              name: true,
              nickname: true,
            },
          },
          groupUser: {
            where: {
              isAccepted: true,
            },
            select: { userId: true },
          },
        },
      },
    },
    ...paginationOptions,
  });

  const myGroup = groups.map((group) => ({
    ...group.group,
    memberCount: group.group.groupUser.length,
    manager: group.group.manager,
    imagePath: group.group.imagePath ? [group.group.imagePath] : [],
  }));
  return {
    groups: myGroup,
    currentPage: page,
    totalPages: totalPages,
  };
};

const getGroupMembers = async (groupName, userId, page, limit) => {
  const group = await prisma.group.findUnique({
    where: { name: groupName },
    include: {
      groupUser: {
        where: { userId: { not: userId } },
        select: {
          user: {
            select: { nickname: true },
          },
        },
      },
    },
  });
  if (!group) throw new Error('그룹을 찾을 수 없음');
  const totalMembersCount = await prisma.groupUser.count({
    where: { groupId: group.id },
  });
  const totalPages = Math.ceil(totalMembersCount / limit);
  const paginationOptions =
    page !== null && limit !== null
      ? { skip: (page - 1) * limit, take: limit }
      : {};
  const groupMembers = await prisma.groupUser.findMany({
    where: { groupId: group.id },
    select: {
      user: {
        select: { nickname: true },
      },
    },
    ...paginationOptions,
  });
  return {
    members: groupMembers.map((groupUser) => groupUser.user.nickname),
    currentPage: page,
    totalPages: totalPages,
  };
};

const createPost = async (userId, groupId, title, content, isNotice) => {
  const groupUser = await groupUtils.getGroupUser(userId, groupId);
  if (!groupUser) throw new Error('그룹 구성원 아님');

  const isManager = await groupUtils.isGroupManager(userId, groupId);
  if (isNotice && !isManager) throw new Error('권한 없음');

  const postData = {
    writer: { connect: { id: userId } },
    group: { connect: { id: groupId } },
    title,
    content,
    isNotice,
  };
  return prisma.post.create({
    data: postData,
  });
};

const getAllPosts = async (groupId, page, limit) => {
  const totalPostsCount = await prisma.post.count({
    where: { groupId },
  });
  const totalPages = Math.ceil(totalPostsCount / limit);

  const paginationOptions =
    page !== null && limit !== null
      ? { skip: (page - 1) * limit, take: limit }
      : {};

  const posts = await prisma.post.findMany({
    where: { groupId },
    ...paginationOptions,
  });
  return {
    posts,
    currentPage: page,
    totalPages: totalPages,
  };
};

const getPostById = async (postId) => {
  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
    include: {
      writer: {
        select: {
          id: true,
          nickname: true,
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
  if (!post) throw new Error('게시글 없음');
  const { writer, comments, ...restPost } = post;
  const commentDetails = comments.map((comment) => ({
    ...comment,
    commenterNickname: comment.writer.nickname,
    writer: undefined,
  }));
  return {
    ...restPost,
    authorNickname: writer.nickname,
    comments: commentDetails,
  };
};

const getRecentPosts = async (userId, page, limit) => {
  const paginationOptions =
    page !== null && limit !== null
      ? { skip: (page - 1) * limit, take: limit }
      : {};
  const userGroupIds = await prisma.groupUser.findMany({
    where: {
      userId: userId,
      isAccepted: true,
    },
    select: {
      groupId: true,
    },
  });
  const groupIds = userGroupIds.map((userGroup) => userGroup.groupId);
  const totalPostsCount = await prisma.post.count({
    where: { groupId: { in: groupIds } },
  });
  const totalPages = Math.ceil(totalPostsCount / limit);
  const posts = await prisma.post.findMany({
    where: { groupId: { in: groupIds } },
    orderBy: { createdAt: 'desc' },
    ...paginationOptions,
  });

  return {
    posts,
    currentPage: page,
    totalPages: totalPages,
  };
};

const editPost = async (postId, userId, postData) => {
  const post = await prisma.post.findUnique({ where: { id: postId } });
  if (!post) throw new Error('존재하지 않는 게시글');
  if (post.writerId !== userId) throw new Error('권한이 없음');
  const filteredData = Object.entries(postData).reduce((acc, [key, value]) => {
    if (value !== null) {
      acc[key] = value;
    }
    return acc;
  }, {});
  return prisma.post.update({
    where: {
      id: postId,
    },
    data: filteredData,
  });
};

const deletePost = async (postId, userId) => {
  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
    include: {
      writer: true,
      group: true,
    },
  });
  if (!post) throw new Error('존재하지 않는 게시글');
  const isAdmin = await groupUtils.isUserGroupAdmin(userId, post.groupId);
  if (post.writerId !== userId && !isAdmin) throw new Error('권한 없음');

  await prisma.post.delete({
    where: {
      id: postId,
    },
  });
};

const deleteComment = async (commentId) => {
  await prisma.comment.delete({
    where: {
      id: commentId,
    },
  });
};

const leaveGroup = async (userId, groupId) => {
  await prisma.groupUser.delete({
    where: {
      userId_groupId: {
        userId: userId,
        groupId: groupId,
      },
    },
  });
};

const removeGroupMember = async (userId, groupId) => {
  const isRemoved = await prisma.groupUser.delete({
    where: {
      userId_groupId: {
        userId: userId,
        groupId: groupId,
      },
    },
  });
  return isRemoved !== null;
};

const dropGroup = async (groupId) => {
  await prisma.group.deleteMany({ where: { id: groupId } });
};

const getGroupByPostId = async (postId) => {
  return prisma.group.findFirst({
    where: { post: { some: { id: postId } } },
  });
};

const getGroupUserByUserIdAndGroupId = async (userId, groupId) => {
  return prisma.groupUser.findUnique({
    where: {
      userId_groupId: {
        userId: userId,
        groupId: groupId,
      },
    },
  });
};

const getUserGroupCertPosts = async (userId, page, limit) => {
  const userGroups = await prisma.groupUser.findMany({
    where: { userId: userId, isAccepted: true },
    select: { groupId: true },
  });
  const groupIds = userGroups.map((group) => group.groupId);
  const groups = await prisma.group.findMany({
    where: { id: { in: groupIds } },
    select: { name: true },
  });
  const groupNames = groups.map((group) => group.name);

  const totalPostsCount = await prisma.certPost.count({
    where: { groupName: { in: groupNames }, isGroupPost: true },
  });
  const totalPages = Math.ceil(totalPostsCount / limit);
  const paginationOptions =
    page !== null && limit !== null
      ? { skip: (page - 1) * limit, take: limit }
      : {};
  const posts = await prisma.certPost.findMany({
    where: { groupName: { in: groupNames }, isGroupPost: true },
    orderBy: { createdAt: 'desc' },
    ...paginationOptions,
  });
  return { posts: posts, currentPage: page, totalPages: totalPages };
};

const getCertPostsByGroupName = async (groupName, page, limit) => {
  const paginationOptions =
    page !== null && limit !== null
      ? { skip: (page - 1) * limit, take: limit }
      : {};
  const totalPostsCount = await prisma.certPost.count({
    where: { groupName, isGroupPost: true },
  });
  const totalPages = Math.ceil(totalPostsCount / limit);
  const certPosts = await prisma.certPost.findMany({
    where: { groupName, isGroupPost: true },
    orderBy: { createdAt: 'desc' },
    include: {
      images: true,
      comments: true,
      participants: true,
    },
    ...paginationOptions,
  });

  if (certPosts.length === 0) {
    throw new Error('인증게시글 없음');
  }

  const posts = certPosts.map((certPost) => {
    const participantNicknames = certPost.participants.map(
      (participant) => participant.participant,
    );
    return {
      ...certPost,
      participants: participantNicknames,
    };
  });
  return {
    posts: posts,
    currentPage: page,
    totalPages: totalPages,
  };
};

module.exports = {
  createGroup,
  getAllGroups,
  getGroupDetails,
  getGroupAndMembership,
  requestToJoinGroup,
  acceptRegistration,
  getMyGroups,
  createPost,
  getAllPosts,
  getPostById,
  editPost,
  deletePost,
  deleteComment,
  leaveGroup,
  isUserGroupAdmin,
  removeGroupMember,
  dropGroup,
  rejectGroupJoinRequest,
  getGroupJoinRequests,
  getRecentPosts,
  getGroupByPostId,
  getGroupUserByUserIdAndGroupId,
  getGroupJoinRequestsByGroupId,
  getGroupMembers,
  getUserGroupCertPosts,
  getCertPostsByGroupName,
};

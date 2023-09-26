const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/** @description 모든 유저 정보 */
const getAllUsers = async (page, limit) => {
  const paginationOptions =
    page !== null && limit !== null
      ? { skip: (page - 1) * limit, take: limit }
      : {};
  const allUserCount = await prisma.user.count();
  const totalPages = Math.ceil(allUserCount / limit);
  const user = await prisma.user.findMany({
    select: {
      id: true,
      nickname: true,
      about: true,
      activity: true,
    },
    orderBy: { id: 'asc' },
    ...paginationOptions,
  });
  const users = await Promise.all(
    user.map(async (user) => {
      const userProfile = await prisma.userProfileImage.findMany({
        where: { userId: user.id },
      });

      const userProfilesUrl = userProfile.map((images) => {
        return images.imageUrl;
      });

      return {
        ...user,
        images: userProfilesUrl,
      };
    }),
  );
  return {
    user: users,
    currentPage: page,
    totalPages: totalPages,
  };
};

/** @description 유저 찾기 */
const searchUsers = async (nickname) => {
  return prisma.user.findUnique({
    where: {
      nickname: nickname,
    },
    select: {
      id: true,
      nickname: true,
      about: true,
      activity: true,
      profileImage: true,
    },
  });
};

/** @description 유저 찾기(id) */
const searchUserId = async (userId) => {
  return prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      nickname: true,
      about: true,
      activity: true,
      profileImage: true,
    },
  });
};

/** @description 랜덤 유저 */
const getRandomUsers = async () => {
  const randomCount = await prisma.user.count();
  const skip = Math.floor(Math.random() * randomCount);
  const user = await prisma.user.findMany({
    take: 6,
    skip: skip,
    orderBy: {
      id: 'desc',
    },
    select: {
      id: true,
      nickname: true,
      about: true,
      activity: true,
    },
  });
  return await Promise.all(
    user.map(async (user) => {
      const userProfile = await prisma.userProfileImage.findMany({
        where: { userId: user.id },
      });

      const userProfilesUrl = userProfile.map((images) => {
        return images.imageUrl;
      });

      return {
        ...user,
        images: userProfilesUrl,
      };
    }),
  );
};

/** @description 유저 정보 */
const getUserInfo = async (userId) => {
  return prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      profileImage: true,
    },
  });
};

/** @description 친구 여부 */
const weAreFriends = async (userId, requestId) => {
  return prisma.friendship.findUnique({
    where: {
      userAId_userBId: {
        userAId: userId,
        userBId: requestId,
      },
    },
  });
};

const createFriendship = async (userAId, userBId) => {
  return prisma.friendship.create({
    data: {
      userAId: userAId,
      userBId: userBId,
    },
  });
};

/** @description 친구 요청 */
const friendRequest = async (userId, requestId) => {
  await prisma.friendship.createMany({
    data: [
      {
        userAId: userId,
        userBId: requestId,
        isAccepted: false,
      },
      {
        userAId: requestId,
        userBId: userId,
        isAccepted: false,
      },
    ],
    include: {
      profileImage: true,
    },
  });
  return friendRequest;
};

/** @description 친구 요청 목록 */
const friendRequestList = async (userId) => {
  return prisma.friendship.findMany({
    where: {
      userBId: userId,
      isAccepted: false,
    },
    select: {
      userA: {
        select: {
          id: true,
          nickname: true,
          about: true,
          activity: true,
          profileImage: true,
        },
      },
    },
  });
};

/** @description 친구 수락 */
const acceptFriend = async (userId, requestId) => {
  return await prisma.friendship.updateMany({
    where: {
      OR: [
        { userAId: requestId, userBId: userId },
        { userAId: userId, userBId: requestId },
      ],
    },
    data: {
      isAccepted: true,
    },
  });
};

/** @description 친구 거절 */
const rejectFriend = async (userId, requestId) => {
  return prisma.friendship.deleteMany({
    where: {
      OR: [
        { userAId: requestId, userBId: userId },
        { userAId: userId, userBId: requestId },
      ],
    },
  });
};

/** @description 친구 목록 */
const getMyFriends = async (userId, page, limit) => {
  const paginationOptions =
    page !== null && limit !== null
      ? { skip: (page - 1) * limit, take: limit }
      : {};
  const myFriendsA = await prisma.friendship.findMany({
    where: {
      userAId: userId,
      isAccepted: true,
    },
    select: {
      userBId: true,
    },
  });

  const myFriendsB = await prisma.friendship.findMany({
    where: {
      userBId: userId,
      isAccepted: true,
    },
    select: {
      userAId: true,
    },
  });

  const uniqueFriendIds = [
    ...new Set(myFriendsA.map((friend) => friend.userBId)),
    ...new Set(myFriendsB.map((friend) => friend.userAId)),
  ];
  const user = await prisma.user.findMany({
    where: {
      id: {
        in: uniqueFriendIds,
      },
    },
    select: {
      id: true,
      nickname: true,
      about: true,
      activity: true,
      profileImage: true,
    },
    orderBy: { id: 'asc' },
    ...paginationOptions,
  });
  const allUserCount = await prisma.user.count({
    where: { id: { in: uniqueFriendIds } },
  });
  const totalPages = Math.ceil(allUserCount / limit);
  return {
    user: user,
    currentPage: page,
    totalPages: totalPages,
  };
};

/** @description 친구 삭제 */
const deleteFriend = async (userId, friendId) => {
  return prisma.friendship.deleteMany({
    where: {
      OR: [
        { userAId: userId, userBId: friendId },
        { userAId: friendId, userBId: userId },
      ],
    },
  });
};

/** @description 나의 인증 횟수, 랭킹 */
const myScoreNRank = async (userId) => {
  return prisma.certPost.count({
    where: {
      writerId: userId,
    },
  });
};

/** @description 친구 최신 게시물 */
const friendsRecentPost = async (userId) => {
  const friends = await prisma.friendship.findMany({
    where: {
      OR: [
        { userAId: userId, isAccepted: true },
        { userBId: userId, isAccepted: true },
      ],
    },
    select: {
      userAId: true,
      userBId: true,
    },
  });
  const friendIds = friends.map((friend) =>
    friend.userAId === userId ? friend.userBId : friend.userAId,
  );
  return prisma.certPost.findMany({
    where: {
      writerId: {
        in: friendIds,
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: 5,
  });
};

const getCertPostsByUserId = async (userId, page, limit) => {
  const paginationOptions =
    page !== null && limit !== null
      ? { skip: (page - 1) * limit, take: limit }
      : {};
  return prisma.certPost.findMany({
    where: {
      writerId: userId,
      isGroupPost: false,
    },
    orderBy: {
      createdAt: 'desc',
    },
    ...paginationOptions,
  });
};

module.exports = {
  getAllUsers,
  searchUsers,
  searchUserId,
  getUserInfo,
  weAreFriends,
  friendRequest,
  friendRequestList,
  acceptFriend,
  rejectFriend,
  getMyFriends,
  deleteFriend,
  getRandomUsers,
  friendsRecentPost,
  myScoreNRank,
  getCertPostsByUserId,
  createFriendship,
};

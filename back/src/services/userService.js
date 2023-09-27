import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/** @description 모든 유저 정보 */
const getAllUsers = async (page, limit) => {
  const paginationOptions =
    page !== null && limit !== null
      ? { skip: (page - 1) * limit, take: limit }
      : {};

  const allUserCount = await prisma.user.count();
  const totalPages = Math.ceil(allUserCount / limit);

  const users = await prisma.user.findMany({
    select: {
      id: true,
      nickname: true,
      about: true,
      activity: true,
    },
    orderBy: { id: 'asc' },
    ...paginationOptions,
  });

  const userImagePath = await Promise.all(
    users.map(async (user) => {
      const imagePath = await prisma.user.findMany({
        where: { userId: user.id },
      });

      return imagePath.map((images) => images.imagePath);
    }),
  );
  const usersCopy = users.map((user) => ({
    ...user,
    imagePath: userImagePath[users.indexOf(user)],
  }));

  return {
    users: usersCopy,
    currentPage: page,
    totalPages,
  };
};

/** @description 유저 찾기 */
const searchUsers = async (nickname) =>
  prisma.user.findUnique({
    where: {
      nickname,
    },
    select: {
      id: true,
      nickname: true,
      about: true,
      activity: true,
      imagePath: true,
    },
  });

/** @description 유저 찾기(id) */
const searchUserId = async (userId) =>
  prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      nickname: true,
      about: true,
      activity: true,
      imagePath: true,
    },
  });

/** @description 랜덤 유저 */
const getRandomUsers = async () => {
  const randomCount = await prisma.user.count();
  const skip = Math.floor(Math.random() * randomCount);
  const users = await prisma.user.findMany({
    take: 6,
    skip,
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
  return Promise.all(
    users.map(async (user) => {
      const ImagePath = await prisma.user.findMany({
        where: { userId: user.id },
      });

      const userImagePath = ImagePath.map((images) => images.imagePath);

      return {
        ...user,
        images: userImagePath,
      };
    }),
  );
};

/** @description 유저 정보 */
const getUserInfo = async (userId) =>
  prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      profileImage: true,
    },
  });

/** @description 친구 여부 */
const weAreFriends = async (userId, requestId) =>
  prisma.friendship.findUnique({
    where: {
      userAId_userBId: {
        userAId: userId,
        userBId: requestId,
      },
    },
  });

const createFriendship = async (userAId, userBId) =>
  prisma.friendship.create({
    data: {
      userAId,
      userBId,
    },
  });

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
const friendRequestList = async (userId) =>
  prisma.friendship.findMany({
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

/** @description 친구 수락 */
const acceptFriend = async (userId, requestId) =>
  prisma.friendship.updateMany({
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

/** @description 친구 거절 */
const rejectFriend = async (userId, requestId) =>
  prisma.friendship.deleteMany({
    where: {
      OR: [
        { userAId: requestId, userBId: userId },
        { userAId: userId, userBId: requestId },
      ],
    },
  });

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
    user,
    currentPage: page,
    totalPages,
  };
};

/** @description 친구 삭제 */
const deleteFriend = async (userId, friendId) =>
  prisma.friendship.deleteMany({
    where: {
      OR: [
        { userAId: userId, userBId: friendId },
        { userAId: friendId, userBId: userId },
      ],
    },
  });

/** @description 나의 인증 횟수, 랭킹 */
const myScoreNRank = async (userId) =>
  prisma.certPost.count({
    where: {
      writerId: userId,
    },
  });

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

export default {
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

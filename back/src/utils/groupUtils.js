import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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

const isUserGroupMember = async (userId, groupId) =>
  prisma.groupUser.findUnique({
    where: {
      userId_groupId: {
        userId,
        groupId,
      },
    },
  });

const getGroupUser = async (userId, groupId) =>
  prisma.groupUser.findUnique({
    where: {
      userId_groupId: {
        userId,
        groupId,
      },
    },
  });

const isGroupManager = async (userId, groupId) => {
  const groupManager = await prisma.group.findUnique({
    where: {
      id: groupId,
    },
    select: {
      manager: {
        select: {
          id: true,
        },
      },
    },
  });

  return groupManager && groupManager.manager.id === userId;
};

export default {
  isUserGroupAdmin,
  isUserGroupMember,
  getGroupUser,
  isGroupManager,
};

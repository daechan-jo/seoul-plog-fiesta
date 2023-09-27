/* eslint-disable consistent-return */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const createRoomId = async (loggedInUserId, otherUserId) => {
  try {
    return `chat_${Math.min(loggedInUserId, otherUserId)}_${Math.max(
      loggedInUserId,
      otherUserId,
    )}`;
  } catch (error) {
    console.error(error);
  }
};

const getUserById = async (loggedInUserId) => {
  try {
    return await prisma.user.findUnique({
      where: { id: loggedInUserId },
    });
  } catch (error) {
    console.log(error);
  }
};

const getUnreadMessages = async (userId) => {
  try {
    return prisma.$queryRaw`
      SELECT * FROM ChatMessage
			WHERE (
						roomId LIKE CONCAT('chat_', ${userId}, '_%') OR
						roomId LIKE CONCAT('chat_%_', ${userId})
				)
        AND senderId != ${userId}
        AND isRead = false
      ORDER BY createdAt DESC, senderId ASC
    `;
  } catch (error) {
    console.log(error);
  }
};

const getChatRoom = async (roomId) => {
  try {
    return await prisma.chatRoom.findUnique({
      where: { id: roomId },
    });
  } catch (error) {
    console.error(error);
  }
};

const getMessagesByRoomId = async (roomId) => {
  try {
    return await prisma.chatMessage.findMany({
      where: { roomId },
    });
  } catch (error) {
    console.error(error);
  }
};

const isReadUpdate = async (messageId) => {
  try {
    return await prisma.chatMessage.update({
      where: { id: messageId },
      data: { isRead: true },
    });
  } catch (error) {
    console.error(error);
  }
};

const createChatRoom = async (roomId) => {
  try {
    return await prisma.chatRoom.create({
      data: { id: roomId },
    });
  } catch (error) {
    console.error(error);
  }
};

const deleteChatMessages = async (roomId) => {
  try {
    return await prisma.chatMessage.deleteMany({
      where: { roomId },
    });
  } catch (error) {
    console.error(error);
  }
};

const deleteChatRoom = async (roomId) => {
  try {
    return await prisma.chatRoom.delete({
      where: { id: roomId },
    });
  } catch (error) {
    console.error(error);
  }
};

export default {
  getUserById,
  getUnreadMessages,
  getChatRoom,
  getMessagesByRoomId,
  isReadUpdate,
  createChatRoom,
  createRoomId,
  deleteChatMessages,
  deleteChatRoom,
};

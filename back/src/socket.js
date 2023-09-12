import chatService from './services/chatService';
const socketIo = require('socket.io');
const socketIoJwt = require('socketio-jwt');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

function initializeSocketServer(server) {
  const io = socketIo(server, {
    path: '/chat',
    cors: {
      origin: 'http://localhost:3000', // 실제 프론트엔드 URL로 대체하세요
      methods: ['GET', 'POST'],
    },
  });

  io.use(
    socketIoJwt.authorize({
      secret: process.env.JWT_SECRET_KEY,
      handshake: true,
      auth_header_required: true,
    }),
  );
  const connectedUsers = {};
  io.on('connection', async (socket) => {
    socket.onAny((e) => {
      console.log(`Socket Event: ${e}`);
    });

    const loggedInUserId = socket.decoded_token.id;

    const user = await chatService.getUserById(loggedInUserId);
    connectedUsers[loggedInUserId] = {
      socketId: socket.id,
      roomId: null,
      user,
    };
    console.log(`[${user.nickname}] connected`);

    // 안읽은 메시지 불러오기
    socket.on('initialize', async (userId) => {
      const messages = await chatService.getUnreadMessages(userId);
      socket.emit('messages', messages);
      console.log(messages, '새로운 메시지');
    });

    /** @description 사용자와 상대방의 아이디 기반 고유 roomId 생성
     * 해당 아이디로 이미 생성된 방이 있다면 채팅 내역을 불러오고 읽음처리*/
    socket.on('joinRoom', async (otherUserId) => {
      const roomId = await chatService.createRoomId(
        loggedInUserId,
        otherUserId,
      );

      const existingRoom = await chatService.getChatRoom(roomId);

      if (existingRoom) {
        connectedUsers[loggedInUserId].roomId = roomId;
        console.log(connectedUsers[loggedInUserId].roomId, '현재 접속항방');
        socket.join(roomId);
        console.log(`${user.nickname}님이 [${roomId}] 방에 접속했습니다.`);
        const messages = await chatService.getMessagesByRoomId(roomId);

        for (let message of messages) {
          if (message.senderId !== loggedInUserId) {
            if (!message.isRead) {
              await chatService.isReadUpdate(message.id);
            }
          }
        }
        socket.emit('messages', messages);
        console.log(`${user.nickname}님의 채팅 내역 불러오기 완료`);
      } else {
        const newRoom = await chatService.createChatRoom(roomId);
        console.log(`[${newRoom}] 방 생성 완료`);
        connectedUsers[loggedInUserId].roomId = roomId;
        socket.join(newRoom.id);
      }
    });

    /** @description 메시지 보내기
     * 메시지를 데이터베이스에 저장 후 상대방이 해당 방에 접속중이라면 전송 후 읽음처리 */
    socket.on('sendMessage', async (otherUserId, message) => {
      const roomId = await chatService.createRoomId(
        loggedInUserId,
        otherUserId,
      );

      let room = await chatService.getChatRoom(roomId);
      if (!room) {
        await chatService.createChatRoom(roomId);
      }

      const createdMessage = await prisma.chatMessage.create({
        data: {
          roomId,
          message,
          senderId: loggedInUserId,
        },
      });
      console.log(`[${message}] 데이터베이스 저장 완료`);

      // 방에 접속중이라면 메시지 보내기
      if (connectedUsers[otherUserId]) {
        const otherUserSocketId = connectedUsers[otherUserId].socketId;

        if (connectedUsers[otherUserId].roomId === roomId) {
          socket.to(roomId).emit('message', {
            senderId: loggedInUserId,
            nickname: user.nickname,
            message,
          });
          console.log(`[${otherUserId}] 에게 메시지 :: ${message}`);

          await chatService.isReadUpdate(createdMessage.id);
        }

        if (connectedUsers[otherUserId].roomId === null) {
          io.to(otherUserSocketId).emit('newMessage', {
            senderId: loggedInUserId,
            nickname: user.nickname,
            messageId: createdMessage.id,
          });
        }
      }
    });

    /** @description 방 나가기 */
    socket.on('leaveRoom', async (otherUserId) => {
      const roomId = await chatService.createRoomId(
        loggedInUserId,
        otherUserId,
      );

      console.log(`[${roomId}] 방에서 나가기`);
      connectedUsers[loggedInUserId].roomId = null;
      socket.leave(roomId);
    });

    /** @description 채팅방 삭제
     * 채팅 내역, 방 삭제 */
    socket.on('deleteRoom', async (otherUserId) => {
      const roomId = `chat_${Math.min(loggedInUserId, otherUserId)}_${Math.max(
        loggedInUserId,
        otherUserId,
      )}`;

      await chatService.deleteChatMessages(roomId);
      await chatService.deleteChatRoom(roomId);
      console.log(`[${roomId}] 방 삭제 완료`);
    });

    socket.on('messageViewed', async (messageId) => {
      await chatService.isReadUpdate(messageId);
    });

    socket.on('disconnect', () => {
      console.log(`User ${loggedInUserId} disconnected`);
    });
  });
  return io;
}

module.exports = initializeSocketServer;

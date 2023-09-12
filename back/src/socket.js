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
    const loggedInUserId = socket.decoded_token.id;
    const user = await prisma.user.findUnique({
      where: { id: loggedInUserId },
    });
    connectedUsers[loggedInUserId] = {
      socketId: socket.id,
      user,
    };
    console.log(`User ${user.nickname} connected`);

    // 안읽은 메시지 불러오기
    socket.on('initialize', async (userId) => {
      const messages = await prisma.$queryRaw`
      SELECT * FROM ChatMessage
			WHERE (
						roomId LIKE CONCAT('chat_', ${userId}, '_%') OR
						roomId LIKE CONCAT('chat_%_', ${userId})
				)
        AND senderId != ${userId}
        AND isRead = false
      ORDER BY createdAt DESC, senderId ASC
    `;
      socket.emit('messages', messages);
    });

    /** @description 사용자와 상대방의 아이디 기반 고유 roomId 생성
     * 해당 아이디로 이미 생성된 방이 있다면 채팅 내역을 불러오고 읽음처리*/
    socket.on('joinRoom', async (otherUserId) => {
      const roomId = `chat_${Math.min(loggedInUserId, otherUserId)}_${Math.max(
        loggedInUserId,
        otherUserId,
      )}`;

      const existingRoom = await prisma.chatRoom.findUnique({
        where: { id: roomId },
      });

      if (existingRoom) {
        socket.join(roomId);
        console.log(existingRoom, '= 채팅방 접속');
        const messages = await prisma.chatMessage.findMany({
          where: { roomId },
        });

        for (let message of messages) {
          if (message.senderId !== loggedInUserId) {
            if (!message.isRead) {
              await prisma.chatMessage.update({
                where: { id: message.id },
                data: { isRead: true },
              });
            }
          }
        }
        socket.emit('messages', messages);
      } else {
        const newRoom = await prisma.chatRoom.create({
          data: { id: roomId },
        });
        console.log(newRoom, '= 방 생성');
        socket.join(newRoom.id);
      }
    });

    socket.on('sendMessage', async (otherUserId, message) => {
      // 마찬가지로 나와 상대방 ID를 기반으로 룸 ID를 만든 다음 보낼 메시지를 데이터베이스에 저장하고 상대방에게 보낸다.
      const roomId = `chat_${Math.min(loggedInUserId, otherUserId)}_${Math.max(
        loggedInUserId,
        otherUserId,
      )}`;
      console.log(message, '= 메시지 이벤트');

      let room = await prisma.chatRoom.findUnique({
        where: { id: roomId },
      });
      if (!room) {
        await prisma.chatRoom.create({
          data: { id: roomId },
        });
      }

      const createdMessage = await prisma.chatMessage.create({
        data: {
          roomId,
          message,
          senderId: loggedInUserId,
        },
      });
      console.log('메시지 DB 저장 완료');
      //상대방 소켓 아이디 가기져오기
      if (connectedUsers[otherUserId]) {
        const otherUserSocketId = connectedUsers[otherUserId].socketId;

        console.log('상대방이 접속중이라서 메시지 전송');
        io.to(otherUserSocketId).emit('message', {
          senderId: loggedInUserId,
          nickname: user.nickname,
          message,
        });

        if (io.sockets.connected[otherUserSocketId]) {
          await prisma.chatMessage.update({
            where: { id: createdMessage.id },
            data: { isRead: true },
          });
        }
        io.to(otherUserSocketId).emit('newMessage', {
          senderId: loggedInUserId,
          nickname: user.nickname,
          messageId: createdMessage.id,
        });
      }
    });

    socket.on('leaveRoom', async (otherUserId) => {
      const roomId = `chat_${Math.min(loggedInUserId, otherUserId)}_${Math.max(
        loggedInUserId,
        otherUserId,
      )}`;

      console.log('채팅방 나가기');
      socket.leave(roomId);
    });

    socket.on('deleteRoom', async (otherUserId) => {
      const roomId = `chat_${Math.min(loggedInUserId, otherUserId)}_${Math.max(
        loggedInUserId,
        otherUserId,
      )}`;

      // 사용자가 채팅방을 지우면, 해당 방과 속해있는 메시지를 데이터베이스에서 삭제한다
      await prisma.chatMessage.deleteMany({
        where: { roomId },
      });
      await prisma.chatRoom.delete({
        where: { id: roomId },
      });
      console.log('채팅방 지우기');
    });

    socket.on('messageViewed', async (messageId) => {
      // isRead 를 true로 업데이트
      await prisma.chatMessage.update({
        where: { id: messageId },
        data: { isRead: true },
      });
    });

    socket.on('disconnect', () => {
      console.log(`User ${loggedInUserId} disconnected`);
    });
  });
  return io;
}

module.exports = initializeSocketServer;

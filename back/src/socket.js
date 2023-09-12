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
    // 인증된 사용자 정보는 소켓.decoded_token에서 확인 가능
    const loggedInUserId = socket.decoded_token.id;
    const user = await prisma.user.findUnique({
      where: { id: loggedInUserId },
    });
    connectedUsers[loggedInUserId] = {
      socketId: socket.id,
      user,
    };
    console.log(`User ${user.nickname} connected`);

    socket.on('initialize', async (userId) => {
      const messages = await prisma.$queryRaw`
      SELECT * FROM ChatMessage 
      WHERE roomId LIKE '%chat_${userId}_%' 
        AND senderId != ${userId}
        AND isRead = false
      ORDER BY createdAt DESC, senderId ASC
    `;
      socket.emit('messages', messages);
    });

    socket.on('joinRoom', async (otherUserId) => {
      // 나와 상대방 ID를 기반으로 고유한 방 ID를 생성
      const roomId = `chat_${Math.min(loggedInUserId, otherUserId)}_${Math.max(
        loggedInUserId,
        otherUserId,
      )}`;

      //이미 둘 사이의 방이 있다면
      const existingRoom = await prisma.chatRoom.findUnique({
        where: { id: roomId },
      });
      console.log(existingRoom, '= null ? 만들어진 방 접속');

      if (existingRoom) {
        socket.join(roomId);
        const messages = await prisma.chatMessage.findMany({
          where: { roomId },
        });
        console.log(messages, '= 채팅 내역 불러오기');

        //상대방이 보낸 메시지 읽음처리
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
        // 채팅내역 불러옴
        socket.emit('messages', messages);
      } else {
        //방이 없다면
        const newRoom = await prisma.chatRoom.create({
          data: { id: roomId },
        });
        console.log(newRoom, '= 최초 채팅 방 생성');
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

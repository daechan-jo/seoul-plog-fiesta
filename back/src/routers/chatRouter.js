import router from 'express';
import authenticateJWT from '../middlewares/authenticateJWT';
import chatController from '../controllers/chatController';

const chatRouter = router();

// chatRouter.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // 프론트엔드 도메인 설정
//   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // 허용할 HTTP 메서드 설정
//   res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // 허용할 헤더 설정
//   next();
// });

chatRouter.get(
	'/chat/unread',
	authenticateJWT,
	chatController.getUnreadChatList,
);

module.exports = chatRouter;

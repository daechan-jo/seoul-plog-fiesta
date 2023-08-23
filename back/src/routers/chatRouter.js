import router from 'express';
import authenticateJWT from '../middlewares/authenticateJWT';
import chatController from '../controllers/chatController';

const chatRouter = router();

chatRouter.get(
	'/chat/unread',
	authenticateJWT,
	chatController.getUnreadChatList,
);

module.exports = chatRouter;

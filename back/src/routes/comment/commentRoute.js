import router from 'express';
import authenticateJWT from '../../middlewares/authenticateJWT';
import commentController from './commentController';
import commentValidate from '../../middlewares/validates/commentValidate';

const commentRoute = router();
commentRoute.post(
	'/comment/:postid',
	authenticateJWT,
	commentValidate.validateCommentCreation,
	commentController.createComment,
);

commentRoute.put(
	'/comment/:commentid',
	authenticateJWT,
	commentValidate.validateCommentCreation,
	commentController.updateComment,
);

commentRoute.delete(
	'/comment/:commentid',
	authenticateJWT,
	commentController.deleteComment,
);

export default commentRoute;

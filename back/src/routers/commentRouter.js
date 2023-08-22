import router from "express";
import authenticateJWT from "../middlewares/authenticateJWT";
import commentController from "../controllers/commentController";
import commentValidate from "../middlewares/validates/commentValidate";

const commentRouter = router();
commentRouter.post(
	"/comment/:postid",
	authenticateJWT,
	commentValidate.validateCommentCreation,
	commentController.createComment,
);

commentRouter.put(
	"/comment/:commentid",
	authenticateJWT,
	commentValidate.validateCommentCreation,
	commentController.updateComment,
);

commentRouter.delete(
	"/comment/:commentid",
	authenticateJWT,
	commentController.deleteComment,
);

module.exports = commentRouter;

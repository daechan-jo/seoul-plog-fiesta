import router from "express";
import authenticateJWT from "../middlewares/authenticateJWT";
import commentController from "../controllers/commentController";

const commentRouter = router();
commentRouter.post(
	"/comment/:postid",
	authenticateJWT,
	commentController.createComment,
);

commentRouter.put(
	"/comment/:commentid",
	authenticateJWT,
	commentController.updateComment,
);

commentRouter.delete(
	"/comment/:commentid",
	authenticateJWT,
	commentController.deleteComment,
);

module.exports = commentRouter;

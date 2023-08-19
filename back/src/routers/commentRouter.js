import router from "express";
import authenticateJWT from "../middlewares/authenticateJWT";
import commentController from "../controllers/commentController";

const commentRouter = router();
commentRouter.post(
	"comment/:postid",
	authenticateJWT,
	commentController.createComment,
);

module.exports = commentRouter;

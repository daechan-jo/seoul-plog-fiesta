import router from "express";
import authenticateJWT from "../middlewares/authenticateJWT";
import groupController from "../controllers/groupController";
const groupRouter = router();

groupRouter.post("/group", authenticateJWT, groupController.createGroup);
groupRouter.get("/group", groupController.getAllGroups);

groupRouter.post(
	"/group/join/:groupid",
	authenticateJWT,
	groupController.requestToJoinGroup,
);
groupRouter.get(
	"/group/join",
	authenticateJWT,
	groupController.getGroupJoinRequests,
);

groupRouter.post(
	"/group/accept/:groupid/:userid",
	authenticateJWT,
	groupController.acceptRegistration,
);

groupRouter.delete(
	"/group/reject/:groupid/:userid",
	authenticateJWT,
	groupController.rejectGroupJoinRequest,
);

groupRouter.get("/group/mygroup", authenticateJWT, groupController.getMyGroups);

groupRouter.get(
	"/group/:groupid",
	authenticateJWT,
	groupController.getGroupDetails,
);

groupRouter.post(
	"/group/post/:groupid",
	authenticateJWT,
	groupController.createPost,
);

groupRouter.get(
	"/group/posts/:groupid",
	authenticateJWT,
	groupController.getAllPosts,
);

groupRouter.get(
	"/group/post/:postid",
	authenticateJWT,
	groupController.getPostById,
);

groupRouter.get(
	"/group/recent/posts",
	authenticateJWT,
	groupController.getRecentPosts,
);

groupRouter.put(
	"/group/post/put/:postid",
	authenticateJWT,
	groupController.editPost,
);

groupRouter.delete(
	"/group/post/delete/:postid",
	authenticateJWT,
	groupController.deletePost,
);

groupRouter.delete(
	"/group/:groupid",
	authenticateJWT,
	groupController.leaveGroup,
);

//todo here
groupRouter.delete(
	"/group/expulse/:groupid/:userid",
	authenticateJWT,
	groupController.removeGroupMember,
);

groupRouter.delete("/group/drop/:groupid", groupController.dropGroup);

module.exports = groupRouter;

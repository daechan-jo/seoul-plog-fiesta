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

//todo 삭제예정
groupRouter.get("/group/random", groupController.getRandomGroups);
groupRouter.get("/group/:groupname", groupController.searchGroupsByName);

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

//todo here
groupRouter.get(
	"/group/recent/posts",
	authenticateJWT,
	groupController.getRecentPosts,
);

groupRouter.put(groupController.editPost);

groupRouter.delete(groupController.deletePost);

groupRouter.post("/group/comment", groupController.createComment);

groupRouter.put("/group/comment/:commentid", groupController.editComment);

groupRouter.delete(groupController.deleteComment);

groupRouter.delete("/group/:groupid", groupController.leaveGroup);

groupRouter.delete(
	"/group/:groupid/:userid",
	groupController.removeGroupMember,
);

groupRouter.delete("/group/drop/:groupid", groupController.dropGroup);

module.exports = groupRouter;

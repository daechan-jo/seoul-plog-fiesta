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

groupRouter.get("/group/:groupid", groupController.getGroupDetails);

groupRouter.get("/group/random", groupController.getRandomGroups);

groupRouter.get("/group/:groupname", groupController.searchGroupsByName);

groupRouter.post("/group/post", groupController.createPost);
groupRouter.get(groupController.getAllPosts);

groupRouter.get("/group/post/:postid", groupController.getPostById);
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

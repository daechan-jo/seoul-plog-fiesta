import router from "express";
import groupController from "../controllers/groupController";
const groupRouter = router();

groupRouter
	.post("/group", groupController.createGroup)
	.get(groupController.getAllGroups);

groupRouter.post("/group/join/:groupid", groupController.requestToJoinGroup);

groupRouter.post(
	"/group/approve/:groupid/:userid",
	groupController.approveRegistration,
);

groupRouter.get("/group/:groupid", groupController.getGroupDetails);

groupRouter.get("/group/list", groupController.getUserGroups);

groupRouter.get("/group/random", groupController.getRandomGroups);

groupRouter.get("/group/:groupname", groupController.searchGroupsByName);

groupRouter
	.post("/group/post", groupController.createPost)
	.get(groupController.getAllPosts);

groupRouter.post("/group/comment", groupController.createComment);

groupRouter
	.get("/group/post/:postid", groupController.getPostById)
	.put(groupController.editPost)
	.delete(groupController.deletePost);

module.exports = groupRouter;

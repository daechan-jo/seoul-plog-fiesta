import router from "express";
import groupController from "../controllers/groupController";
const groupRouter = router();

groupRouter.post("/group", groupController.createGroup);
groupRouter.get("/group", groupController.getAllGroups);

//todo passport 구현 후 테스트필요
groupRouter.post("/group/join/:groupid", groupController.requestToJoinGroup);
groupRouter.post(
	"/group/approve/:groupid/:userid",
	groupController.approveRegistration,
);
groupRouter.get("/group/:groupid", groupController.getGroupDetails);
groupRouter.get("/group/list", groupController.getUserGroups);

module.exports = groupRouter;

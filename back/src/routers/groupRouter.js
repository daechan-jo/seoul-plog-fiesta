import router from "express";
import groupController from "../controllers/groupController";
const groupRouter = router();

groupRouter.post("/group", groupController.createGroup);
groupRouter.get("/group", groupController.getAllGroups);
groupRouter.get("/group/:groupid", groupController.getGroupDetails);

//todo passport 구현 후 테스트필요
groupRouter.post("/group/join/:groupid", groupController.requestToJoinGroup);
groupRouter.post(
	"/group/approve/:groupid/:userid",
	groupController.approveRegistration,
);

module.exports = groupRouter;

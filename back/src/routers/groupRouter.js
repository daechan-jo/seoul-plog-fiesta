import router from "express";
import groupController from "../controllers/groupController";
const groupRouter = router();

groupRouter.post("/group", groupController.createGroup);
groupRouter.get("/group", groupController.getAllGroups);
groupRouter.get("/group/:id", groupController.getGroupDetails);
groupRouter.post("/group/join/:id", groupController.requestToJoinGroup);

module.exports = groupRouter;

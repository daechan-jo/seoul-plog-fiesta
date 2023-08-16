import router from "express";
import groupController from "../controllers/groupController";
const groupRouter = router();

groupRouter.post("/group", groupController.createGroup);
groupRouter.get("/group", groupController.getAllGroups);
groupRouter.get("/group/:id", groupController.getGroupDetails);

groupRouter.get("/group/list");
groupRouter.get("/group/list/info");
groupRouter.get("/group/random");
groupRouter.get("/group/:name");
groupRouter.get("/group/board");
groupRouter.post("/group/board");
groupRouter.get("/group/board/:id").get().put().post();
groupRouter.delete("/group/board/drop/:id");
groupRouter.delete("/group/drop");
groupRouter.delete("/group/exile");
groupRouter.post("/group/img");

module.exports = groupRouter;

import router from "express";
import userController from "../controllers/userController";
const userRouter = router();

userRouter.get("/user", userController.currentUser);

// userRouter.get("/user/:name", userController.searchUsers);

userRouter.delete("/user/drop", userController.deleteMyfriendship);

userRouter.get("/user/list", userController.getMyFriendship);

userRouter.get("/user/random", userController.getRandomUsers);

module.exports = userRouter;

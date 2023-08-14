import userController from "../controllers/userController";
import router from "express";

const userRouter = router();

userRouter.post("/signup", userController.addUser);

module.exports = userRouter;

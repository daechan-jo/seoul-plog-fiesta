import router from "express";
import authenticateLocal from "../middlewares/authenticateLocal";
import authController from "../controllers/authController";

const authRouter = router();

authRouter.post("/auth", authController.createUser); //회원가입

authRouter.post("/auth/login", authenticateLocal, authController.login);

module.exports = authRouter;

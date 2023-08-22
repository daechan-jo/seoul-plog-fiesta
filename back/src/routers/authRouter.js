import router from "express";
import authController from "../controllers/authController";
import authenticateJWT from "../middlewares/authenticateJWT";
import authenticateLocal from "../middlewares/authenticateLocal";

const authRouter = router();

authRouter.post("/auth", authController.createUser); //회원가입

authRouter.post("/auth/login", authenticateLocal, authController.login); //로그인

authRouter.post("/auth/setPassword", authenticateJWT, authController.findPasswordByEmail); //임시비밀번호 발급

authRouter.put("/auth/update", authenticateJWT, authController.changeInformation); //회원정보 변경

authRouter.delete("/auth/drop", authenticateJWT, authController.removeUser); //회원 탈퇴

module.exports = authRouter;

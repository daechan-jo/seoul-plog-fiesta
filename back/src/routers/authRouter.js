import router from 'express';
import authController from '../controllers/authController';
import authenticateJWT from '../middlewares/authenticateJWT';
import authenticateLocal from '../middlewares/authenticateLocal';

const authRouter = router();

authRouter.post('/auth', authController.createUser); //회원가입

authRouter.post('/auth/login', authenticateLocal, authController.login); //로그인

authRouter.post('/auth/findpassword', authController.sendEmailWithTokenUrl); //비밀번호 찾기 -> 이메일 보냄

authRouter.get('/auth/checkemail', authController.checkEmail); //사용자 인증

authRouter.post('/auth/changepassword', authController.changePassword); //비밀번호 페이지로 이동

authRouter.put(
  '/auth/update',
  authenticateJWT,
  authController.changeInformation,
); //회원정보 변경

authRouter.delete('/auth/drop', authenticateJWT, authController.removeUser); //회원 탈퇴

module.exports = authRouter;

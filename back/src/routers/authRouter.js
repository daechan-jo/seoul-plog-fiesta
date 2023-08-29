import router from 'express';
import authController from '../controllers/authController';
import authenticateJWT from '../middlewares/authenticateJWT';
import authenticateLocal from '../middlewares/authenticateLocal';
import authValidate from '../middlewares/validates/authValidate';

const authRouter = router();

//회원가입
authRouter.post('/auth', authController.createUser);

//로그인
authRouter.post('/auth/login', authenticateLocal, authController.login);

//비밀번호 찾기 -> 이메일 보냄
authRouter.post('/auth/findpassword', authController.sendEmailWithTokenUrl);

//사용자 인증
authRouter.get('/auth/checkemail', authController.checkEmail);

//비밀번호 변경
authRouter.post('/auth/changepassword', authController.changePassword);

//로그인 상태에서 비밀번호 변경
authRouter.put(
  '/auth/login/update',
  authenticateJWT,
  authController.changePasswordByCheckOriginPassword,
);

//회원정보 변경
authRouter.put(
  '/auth/update',
  authValidate.validateUserUpdate,
  authenticateJWT,
  authController.changeInformation,
);

//회원 탈퇴
authRouter.delete('/auth/drop', authenticateJWT, authController.removeUser); //회원 탈퇴

module.exports = authRouter;

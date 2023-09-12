import router from 'express';
import authController from '../controllers/authController';
import authenticateJWT from '../middlewares/authenticateJWT';
import authenticateLocal from '../middlewares/authenticateLocal';
import authValidate from '../middlewares/validates/authValidate';

const authRouter = router();

authRouter.post('/auth', authController.createUser);

authRouter.post('/auth/login', authenticateLocal, authController.login);

authRouter.post('/auth/findpassword', authController.sendEmailWithTokenUrl);

authRouter.get('/auth/checkemail', authController.checkEmail);

authRouter.post('/auth/changepassword', authController.changePassword);

authRouter.put(
  '/auth/login/update',
  authenticateJWT,
  authController.changePasswordByCheckOriginPassword,
);

authRouter.put(
  '/auth/update',
  authValidate.validateUserUpdate,
  authenticateJWT,
  authController.changeInformation,
);

//회원 탈퇴
authRouter.delete('/auth/drop', authenticateJWT, authController.removeUser); //회원 탈퇴

module.exports = authRouter;

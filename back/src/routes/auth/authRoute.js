import router from 'express';
import authController from './authController';
import authenticateJWT from '../../middlewares/authenticateJWT';
import authenticateLocal from '../../middlewares/authenticateLocal';
import authValidate from '../../middlewares/validates/authValidate';

const authRoute = router();

authRoute.post('/auth', authController.createUser);

authRoute.post('/auth/login', authenticateLocal, authController.login);

authRoute.post('/auth/findpassword', authController.sendEmailWithTokenUrl);

authRoute.get('/auth/checkemail', authController.checkEmail);

authRoute.post('/auth/changepassword', authController.changePassword);

authRoute.put(
	'/auth/login/update',
	authenticateJWT,
	authController.changePasswordByCheckOriginPassword,
);

authRoute.put(
	'/auth/update',
	authValidate.validateUserUpdate,
	authenticateJWT,
	authController.changeInformation,
);

authRoute.delete('/auth/drop', authenticateJWT, authController.removeUser);

export default authRoute;

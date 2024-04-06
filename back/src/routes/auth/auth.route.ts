import router from 'express';
import { authenticateJWT } from '../../middlewares/authenticateJWT';
import authenticateLocal from '../../middlewares/authenticateLocal';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();
const authService = new AuthService(prismaClient);
const authController = new AuthController(authService);
const authRoute = router();

authRoute.post('/auth', authController.createUser);

authRoute.post('/auth/login', authenticateLocal, authController.login);

authRoute.post('/auth/findpassword', authController.sendEmailWithTokenUrl);

authRoute.get('/auth/checkemail', authController.checkEmail);

authRoute.post('/auth/changepassword', authController.unLoginUpdatePassword);

authRoute.put(
  '/auth/login/update',
  authenticateJWT,
  authController.loginChangePassword,
);

authRoute.put(
  '/auth/update',
  authenticateJWT,
  authController.changeInformation,
);

authRoute.delete('/auth/drop', authenticateJWT, authController.removeUser);

export default authRoute;

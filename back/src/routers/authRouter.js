import router from 'express';
import authController from '../controllers/authController';
import jwt from 'jsonwebtoken';

const authRouter = router();

authRouter.post('/auth', authController.createUser); //회원가입

module.exports = authRouter;
import passport from 'passport';
import { generateToken } from '../utils/generateToken';
import { Request, Response, NextFunction } from 'express';

/** @description local 전략을 사용해 사용자를 인증하고 JWT 토큰 발급 */
const authenticateLocal = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate(
    'local',
    { session: false },
    (err: any, user: Express.User, info: { message: any }) => {
      if (err) {
        console.error(err);
        return next(err);
      }
      if (!user) {
        return res.status(401).json({ message: info.message });
      }
      const secretKey = process.env.JWT_SECRET_KEY;
      const tokenExpires = process.env.JWT_TOKEN_EXPIRES;
      const token = generateToken(
        { id: user.id, name: user.name, email: user.email },
        secretKey,
        tokenExpires,
      );

      req.user = user;
      req.token = token;
      return next();
    },
  )(req, res, next);
};

export default authenticateLocal;

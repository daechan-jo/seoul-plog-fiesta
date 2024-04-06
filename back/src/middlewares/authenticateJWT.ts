import passport from 'passport';
import { Request, Response, NextFunction } from 'express';

/** @description jwt전략
 * 요청의 token 을 디코드하여 분석한 뒤 인가를 결정합니다.
 * 인가가 끝난 다음 미들웨어로 req.user에 로그인한 유저의 정보를 담아서 내보내줌 */
export const authenticateJWT = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (err) {
      console.error(err);
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ message: '로그인 상태가 아닙니다.' });
    }
    req.user = user;
    return next();
  })(req, res, next);
};

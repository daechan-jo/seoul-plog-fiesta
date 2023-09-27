import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const LocalStrategy = require('passport-local').Strategy;

const prisma = new PrismaClient();

/** @description local 전략
 * 이메일과 패스워드를 데이터베이스와 대조해 유저를 확인합니다 */
const local = new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
  },
  async (email, password, done) => {
    try {
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });
      if (!user) {
        return done(null, false, {
          message: '이메일 또는 비밀번호가 일치하지 않습니다.',
        });
      }
      const result = await bcrypt.compare(password, user.password);
      if (!result) {
        return done(null, false, {
          message: '이메일 또는 비밀번호가 일치하지 않습니다.',
        });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  },
);
export default local;

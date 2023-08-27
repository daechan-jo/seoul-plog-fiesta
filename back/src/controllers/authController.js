import authService, { getUserByEmail } from '../services/authService';
import smtpTransport from '../config/sendEmail';
import randomPassword from '../utils/randomPassword';
import { text } from 'express';

/** @description 새로운 유저를 생성 */
const createUser = async (req, res, next) => {
  try {
    const userData = req.body;
    if (userData.password !== userData.confirmPassword)
      throw new Error('비밀번호 확인 불일치');
    const user = await authService.createUser(userData);
    console.log(user);
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    error.status = 500;
    next(error);
  }
};

/** @description 로그인 -> token값을 반환 */
const login = async (req, res, next) => {
  try {
    const id = req.user.id;
    const groups = await authService.findGroupsById(id);
    const friendships = await authService.findFriendIdsById(id);

    const user = {
      id: id,
      token: req.token,
      email: req.user.email,
      nickname: req.user.nickname,
      groups: groups,
      friendshipsA: friendships,
    };
    console.log(user);
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    error.status = 500;
    next(error);
  }
};

/** @description 비밀번호 변경
 * 1. TokenUrl이 담긴 이메일 전송
 * */
const sendEmailWithTokenUrl = async (req, res, next) => {
  try {
    const email = req.body.email;
    const existingUser = await authService.getUserByEmail(email);
    const token = randomPassword.createRandomPassword(); //todo 함수 명 변경
    //console.log(existingUser);

    const emailOptions = {
      from: process.env.USER,
      to: email,
      subject: '[SeoulPlogFiesta] 비밀번호 변경 안내',
      html:
        '<h2>안녕하세요. SeoulPlogFiesta입니다.</h2>' + //todo: 버튼으로 변경
        '<h2>고객님의 비밀번호 변경을 위해 아래의 링크를 클릭해주세요.</h2>' +
        '<a href= "' +
        process.env.SERVER_URL +
        'auth/checkEmail?token=' +
        token +
        '">비밀번호 재설정 링크<a>',
    };

    smtpTransport.sendMail(emailOptions, (err, info) => {
      if (err) {
        console.log(err);
      } else {
        console.log('성공적으로 이메일을 전송하였습니다.', info.response);
        smtpTransport.close();
      }
    });

    const user = await authService.updatePasswordTokenByEmail(email, token);
    res.status(200).json(user); //빈 응답
  } catch (error) {
    console.error(error);
    error.status = 500;
    next(error);
  }
};

const checkEmail = async (req, res, next) => {
  const token = req.query.token;
  try {
    const user = await authService.getUserByPasswordToken(token); //유저 특정
    const updatedUser = await authService.updatePasswordValidByEmail(
      user.email,
    ); // 유저에 email_auth_at 날짜를 기록

    const passwordToken = updatedUser.passwordToken;
    const email = updatedUser.email;

    // 유저 이메일 인증 처리후 리다이렉트
    res.redirect(
      '/auth/changePassword?email=' + email + '&token=' + passwordToken,
    );
  } catch (error) {
    console.error(error);
    error.status = 500;
    next(error);
  }
};

const changePassword = async (req, res, next) => {
  try {
    const { passwordToken, email, password } = req.body; //token, email, 변경될 password를 받음
    const user = await authService.getUserByEmail(email);

    if (!passwordToken || !email || !password) {
      throw new Error('요청 데이터가 부족합니다.');
    }

    if (!user.passwordToken) {
      throw new Error('인증이 확인되지 않았습니다.');
    }
    const currentTime = new Date();
    let diff = Math.abs(currentTime.getTime() - user.passwordValid.getTime());
    diff = Math.ceil(diff / (1000 * 60 * 60 * 24));

    if (user.passwordToken == passwordToken && diff > 3) {
      throw new Error('비밀번호 인증 기간이 지났습니다.');
    }
    if (!user.passwordToken == passwordToken) {
      throw new Error('권한이 없습니다.');
    }
    const updatedUser = await authService.changePassword(email, password);
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    error.status = 500;
    next(error);
  }
};

/** @description 회원정보 변경
 * id는 req.user에서 받아오고
 * nickname, name, about, activity는 req.body에서 받아옴
 * 다 같이 묶어 변경
 */
const changeInformation = async (req, res, next) => {
  try {
    const user = {
      id: req.user.id,
      nickname: req.body.nickname,
      name: req.body.name,
      about: req.body.about,
      activity: req.body.activity,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
    };

    if (user.password !== user.confirmPassword)
      throw new Error('비밀번호 확인 불일치');

    console.log(user);
    const changedUser = await authService.changeInformation(user);
    //console.log(user);
    res.status(200).json(changedUser);
  } catch (error) {
    console.error(error);
    error.status = 500;
    next(error);
  }
};

const removeUser = async (req, res, next) => {
  try {
    const id = req.user.id;
    const user = await authService.removeUser(id);
    console.log(user);
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    error.status = 500;
    next(error);
  }
};

module.exports = {
  createUser,
  login,
  sendEmailWithTokenUrl,
  changeInformation,
  removeUser,
  checkEmail,
  changePassword,
};

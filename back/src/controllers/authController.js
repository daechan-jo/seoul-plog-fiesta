import authService from '../services/authService';
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
    const user = {
      id: req.user.id,
      token: req.token,
      email: req.user.email,
      nickname: req.user.nickname,
    };
    console.log(user);
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    error.status = 500;
    next(error);
  }
};

/** @description 비밀번호 변경 1. TokenUrl이 담긴 이메일 전송*/
const sendEmailWithTokenUrl = async (req, res, next) => {
  try {
    const email = req.body.email;
    const existingUser = await authService.getUserByEmail(email);
    const token = randomPassword.createRandomPassword(); //todo 함수 명 변경
    //console.log(existingUser);

    const emailOptions = {
      from: 'qweasdzxc0210@naver.com',
      to: email,
      subject: '[SeoulPlogFiesta] 비밀번호 변경 안내',
      html:
        '<h2>안녕하세요. SeoulPlogFiesta입니다.</h2>' +
        '<h2>고객님의 비밀번호 변경을 위해 아래의 링크를 클릭해주세요.</h2>' +
        '<a href= "http://localhost:3000/auth/changePassword?token=' +
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
    //해당 유저의 비밀번호를 임시 비밀번호로 변경
    //const user = authService.changePassword(email, token);
    res.status(200).json(user); //빈 응답
  } catch (error) {
    console.error(error);
    error.status = 500;
    next(error);
  }
};

/*
const getUserByPasswordToken = async (req, res, next) => {
  const token = req.query.token;
  try {
    const user = authService.getUserByPasswordToken(token);
    //유저 특정
    const email = user.email;
    const passwordToken =  user.passwordToken
    res.redirect("/realChangePassword?" + email + passwordToken)
  } catch (error) {
    console.error(error);
    error.status = 500;
    next(error);
  }
};

const changePassword = async (req, res, next) => {
  try{
    const email = req.query=
  }
}
*/

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
    };
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

/** @description 로그아웃 -> 토큰 쿠키 삭제*/
const logout = async (req, res, next) => {
  try {
    res.clearCookie('token').send('로그아웃 됨');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createUser,
  login,
  sendEmailWithTokenUrl,
  changeInformation,
  removeUser,
  logout,
  //getUserByPasswordToken,
};

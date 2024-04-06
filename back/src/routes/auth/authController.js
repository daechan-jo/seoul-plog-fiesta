import authService from './authService';
import randomToken from '../../utils/randomToken';
import mailSend from '../../utils/mailSend';
import localService from '../../services/localService';

const createUser = async (req, res, next) => {
  /**
   * #swagger.tags = ['Auth']
   * #swagger.summary = '회원가입'
   * #swagger.description = '이메일과 닉네임 중복 검사 후 회원가입'
   */
  try {
    const userData = req.body;

    if (userData.password !== userData.confirmPassword)
      return res.status(400).json('비밀번호 확인 불일치');

    const user = await authService.createUser(userData);
    return res.status(201).json(user);
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

const login = async (req, res, next) => {
  /**
   * #swagger.tags = ['Auth']
   * #swagger.summary = '로그인'
   * #swagger.description = '로컬 로그인. 로그인 성공시 JWT 발급'
   */
  try {
    const { id } = req.user;
    // todo N+1 문제 해결
    const groups = await authService.getGroupsByUserId(id);
    const friendships = await authService.getFriendIdsByUserId(id);
    const user = {
      id,
      token: req.token,
      email: req.user.email,
      nickname: req.user.nickname,
      groups,
      friendshipsA: friendships,
    };
    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

const sendEmailWithTokenUrl = async (req, res, next) => {
  /**
   * #swagger.tags = ['Auth']
   * #swagger.summary = '비밀번호 찾기'
   * #swagger.description = '입력받은 닉네임과 이메일을 데이터베이스와 대조 후 해당 이메일로 링크 + 토큰 전송'
   */
  try {
    const { nickname } = req.body;
    const { email } = req.body;

    // todo 그냥 최적화 필요..

    if (!nickname || !email)
      return res.status(400).json({ message: '입력해주세요' });

    // 유저가 있는지 검증
    const existingUser = await authService.getUserByEmail(email);

    // 유저가 해당 닉네임을 가지고 있는지
    if (existingUser.nickname !== nickname)
      return res.status(400).json({ message: '닉네임이 일치하지 않습니다.' });
    // 링크에 포함될 랜덤 토큰 생성
    const token = randomToken.createRandomToken();

    // 이메일 내용
    const emailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: '[SeoulPlogFiesta] 비밀번호 변경 안내',
      html:
        `<h2>안녕하세요. SeoulPlogFiesta입니다.</h2>` +
        `<h2>고객님의 비밀번호 변경을 위해 아래의 링크를 클릭해주세요.</h2>` +
        `<a href= '${process.env.SERVER_URL}auth/checkEmail?token=${token}'>비밀번호 재설정 링크<a>`,
    };
    // 이메일 발송
    await mailSend(emailOptions);
    // 사용자의 토큰 업데이트
    const user = await authService.updatePasswordTokenByEmail(email, token);
    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

const checkEmail = async (req, res, next) => {
  /**
   * #swagger.tags = ['Auth']
   * #swagger.summary = '비밀번호찾기 링크 인증'
   * #swagger.description = '토큰 검증 후 비밀번호 변경 페이지로 리다이렉트'
   */
  try {
    const { token } = req.query;
    const user = await authService.getUserByPasswordToken(token);

    // 유저에 PasswordValid, 토큰 유효 기간 기록
    const updatedUser = await authService.updatePasswordValidByEmail(
      user.email,
    );
    const { passwordToken } = updatedUser;
    const { email } = updatedUser;
    // 유저 이메일 인증 처리후 리다이렉트 -> 프론트로
    return res.redirect(
      `${process.env.FRONT_URL}?email=${email}&token=${passwordToken}`,
    );
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

const changePassword = async (req, res, next) => {
  /**
   * #swagger.tags = ['Auth']
   * #swagger.summary = '비밀번호 찾기 비밀번호 변경'
   * #swagger.description = '토큰 검증 후 비밀번호 변경'
   */
  try {
    const { passwordToken, email, password } = req.body;

    const user = await authService.getUserByEmail(email);

    if (!passwordToken || !email || !password) {
      return res.status(400).json({ message: '요청 데이터가 부족합니다.' });
    }
    if (!user.passwordToken) {
      return res.status(400).json({ message: '인증이 확인되지 않았습니다.' });
    }
    // 현재 시간
    const currentTime = new Date();

    // 토큰 유효 시간과 현재 시간 차이
    let diff = Math.abs(currentTime.getTime() - user.passwordValid.getTime());
    diff = Math.ceil(diff / (1000 * 60 * 60 * 24));

    // 3일 이상 지났을 때
    if (user.passwordToken === passwordToken && diff > 3) {
      return res
        .status(400)
        .json({ message: '비밀번호 인증 기간이 지났습니다.' });
    }
    if (!user.passwordToken === passwordToken) {
      return res.status(403).json({ message: '권한이 없습니다.' });
    }

    const updatedUser = await authService.changePassword(email, password);
    return res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

const changeInformation = async (req, res, next) => {
  /**
   * #swagger.tags = ['Auth']
   * #swagger.summary = '회원정보 업데이트'
   */
  try {
    if (!req.body.password) {
      return res.status(400).json({ message: '비밀번호를 입력해주세요' });
    }
    // todo 그냥 최적화..서비스로직에서 앤트리 쓰자..
    const user = {
      id: req.user.id,
      nickname: req.body.nickname || req.user.nickname, // 입력하지 않으면 기존 정보 유지
      name: req.body.name || req.user.name,
      about: req.body.about || req.user.about,
      activity: req.body.activity || req.user.activity,
      password: req.body.password,
    };

    const changedUser = await authService.changeInformation(user);
    return res.status(200).json(changedUser);
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

const changePasswordByCheckOriginPassword = async (req, res, next) => {
  /**
   * #swagger.tags = ['Auth']
   * #swagger.summary = '비밀번호 변경'
   */
  try {
    const { password, newPassword, newConfirmPassword } = req.body;

    if (newPassword !== newConfirmPassword) {
      return res
        .status(400)
        .json({ message: '비밀번호와 확인 비밀번호가 일치하지 않습니다.' });
    }
    // todo 마찬가지
    const user = {
      id: req.user.id,
      password,
      newPassword,
    };
    const updatedUser = await authService.changePasswordByCheckOriginPassword(
      user,
    );
    return res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

const removeUser = async (req, res, next) => {
  /**
   * #swagger.tags = ['Auth']
   * #swagger.summary = '회원탈퇴'
   * #swagger.description = '회원과 관련된 모든 데이터 삭제. 가입되어있는 그룹이나 친구가 있다면 탈퇴 불가'
   */
  try {
    const userId = req.user.id;
    await localService.LocalStorageClearByDropUser(userId);
    await authService.removeUser(userId);
    return res.status(204).json({ message: '회원탈퇴가 완료되었습니다.' });
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

export default {
  createUser,
  login,
  sendEmailWithTokenUrl,
  changeInformation,
  removeUser,
  checkEmail,
  changePassword,
  changePasswordByCheckOriginPassword,
};

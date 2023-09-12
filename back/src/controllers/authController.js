import authService from '../services/authService';
import randomToken from '../utils/randomToken';
import mailSend from '../utils/mailSend';

/** @description 회원가입 -> 새로운 유저를 생성 */
const createUser = async (req, res, next) => {
  try {
    const userData = req.body;

    if (userData.password !== userData.confirmPassword)
      throw new Error('비밀번호 확인 불일치');

    const user = await authService.createUser(userData);
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

/** @description 로그인 -> token, 그룹아이디, 친구관계를 반환 */
const login = async (req, res, next) => {
  try {
    const id = req.user.id;
    const groups = await authService.getGroupsByUserId(id);
    const friendships = await authService.getFriendIdsByUserId(id);
    const user = {
      id: id,
      token: req.token,
      email: req.user.email,
      nickname: req.user.nickname,
      groups: groups,
      friendshipsA: friendships,
    };
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

/** @description 이메일 발송 ->
 * 토큰 및 이메일이 포함된 url 발송*/
const sendEmailWithTokenUrl = async (req, res, next) => {
  try {
    const nickname = req.body.nickname;
    const email = req.body.email;

    if (!nickname || !email) throw new Error('닉네임과 이메일을 입력해주세요');

    //유저가 있는지 검증
    const existingUser = await authService.getUserByEmail(email);

    //유저가 해당 닉네임을 가지고 있는지
    if (existingUser.nickname !== nickname)
      throw new Error('일치하는 사용자가 없습니다.');

    //링크에 포함될 랜덤 토큰 생성
    const token = randomToken.createRandomToken();

    //이메일 내용
    const emailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: '[SeoulPlogFiesta] 비밀번호 변경 안내',
      html:
        '<h2>안녕하세요. SeoulPlogFiesta입니다.</h2>' +
        '<h2>고객님의 비밀번호 변경을 위해 아래의 링크를 클릭해주세요.</h2>' +
        '<a href= "' +
        process.env.SERVER_URL +
        'auth/checkEmail?token=' +
        token +
        '">비밀번호 재설정 링크<a>',
    };
    //이메일 발송
    await mailSend(emailOptions);
    //사용자의 토큰 업데이트
    const user = await authService.updatePasswordTokenByEmail(email, token);
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

/** @description 이메일 인증 */
const checkEmail = async (req, res, next) => {
  const token = req.query.token;
  try {
    const user = await authService.getUserByPasswordToken(token);

    //유저에 PasswordValid, 토큰 유효 기간 기록
    const updatedUser = await authService.updatePasswordValidByEmail(
      user.email,
    );
    const passwordToken = updatedUser.passwordToken;
    const email = updatedUser.email;
    // 유저 이메일 인증 처리후 리다이렉트 -> 프론트로
    res.redirect(
      process.env.FRONT_URL + '?email=' + email + '&token=' + passwordToken,
    );
  } catch (error) {
    console.error(error);
    next(error);
  }
};

/** @description 이메일 인증 후 비밀번호 변경*/
const changePassword = async (req, res, next) => {
  try {
    //token, email, 변경될 password를 받음
    const { passwordToken, email, password } = req.body;

    const user = await authService.getUserByEmail(email);

    if (!passwordToken || !email || !password) {
      return res.status(400).json({ message: '요청 데이터가 부족합니다.' });
    }
    if (!user.passwordToken) {
      return res.status(400).json({ message: '인증이 확인되지 않았습니다.' });
    }
    //현재 시간
    const currentTime = new Date();

    //토큰 유효 시간과 현재 시간 차이
    let diff = Math.abs(currentTime.getTime() - user.passwordValid.getTime());
    diff = Math.ceil(diff / (1000 * 60 * 60 * 24));

    //3일 이상 지났을 때
    if (user.passwordToken === passwordToken && diff > 3) {
      return res
        .status(400)
        .json({ message: '비밀번호 인증 기간이 지났습니다.' });
    }
    if (!user.passwordToken === passwordToken) {
      return res.status(403).json({ message: '권한이 없습니다.' });
    }

    const updatedUser = await authService.changePassword(email, password);
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

/** @description 회원정보 변경*/
const changeInformation = async (req, res, next) => {
  try {
    if (!req.body.password) {
      return res.status(400).json({ message: '비밀번호를 입력해주세요' });
    }

    const user = {
      id: req.user.id,
      nickname: req.body.nickname || req.user.nickname, //입력하지 않으면 기존 정보 유지
      name: req.body.name || req.user.name,
      about: req.body.about || req.user.about,
      activity: req.body.activity || req.user.activity,
      password: req.body.password,
    };

    const changedUser = await authService.changeInformation(user);
    res.status(200).json(changedUser);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

/**@description 기존 비밀번호 일치시 비밀번호 변경 */
const changePasswordByCheckOriginPassword = async (req, res, next) => {
  try {
    const { password, newPassword, newConfirmPassword } = req.body;

    if (newPassword !== newConfirmPassword) {
      return res
        .status(400)
        .json({ message: '비밀번호와 확인 비밀번호가 일치하지 않습니다.' });
    }
    const user = {
      id: req.user.id,
      password: password,
      newPassword: newPassword,
    };
    const updatedUser = await authService.changePasswordByCheckOriginPassword(
      user,
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

/** @description 회원 탈퇴*/
const removeUser = async (req, res, next) => {
  try {
    const id = req.user.id;
    const groups = await authService.getGroupsByUserId(id);
    const friendships = await authService.getFriendIdsByUserId(id);

    if (groups.length !== 0)
      return res.status(400).json({
        message: '가입하거나 생성한 그룹이 있으면 탈퇴할 수 없습니다',
      });

    if (friendships.length !== 0)
      return res
        .status(400)
        .json({ message: '친구관계가 있으면 탈퇴할 수 없습니다.' });

    await authService.deleteUserProfileImageByUserId(id);
    await authService.deleteCertPostImagesByUserId(id);
    await authService.deleteCertPostsAndCommentsByUserId(id);
    await authService.deleteMyCommentsOnOtherUserCertPosts(id);

    await authService.removeUser(id);
    res.status(204).json({ message: '회원탈퇴가 완료되었습니다.' });
  } catch (error) {
    console.error(error);
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
  changePasswordByCheckOriginPassword,
};

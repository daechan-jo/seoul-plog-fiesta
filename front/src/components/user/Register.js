import styles from './user.module.scss';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import * as Api from '../../api';
import { validateEmail } from '../../utils';

const Register = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    nickname: '',
  });

  //위 validateEmail 함수를 통해 이메일 형태 적합 여부를 확인함.
  const isEmailValid = validateEmail(userData.email);
  // 비밀번호가 4글자 이상인지 여부를 확인함.
  const isPasswordValid = userData.password.length >= 4;
  // 비밀번호와 확인용 비밀번호가 일치하는지 여부를 확인함.
  const isPasswordSame = userData.password === userData.confirmPassword;
  // 이름이 2글자 이상인지 여부를 확인함.
  const isNameValid = userData.name.length >= 2;
  const isNickNameValid = userData.nickname.length >= 2;
  // 위 4개 조건이 모두 동시에 만족되는지 여부를 확인함.
  const isFormValid =
    isEmailValid && isPasswordValid && isPasswordSame && isNameValid;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) {
      alert('입력값을 다시 확인해주세요');
      setUserData((prevData) => ({
        ...prevData,
        password: '',
        confirmPassword: '',
      }));
      return;
    }

    try {
      // "user/register" 엔드포인트로 post요청함.
      await Api.registerPost('/auth', userData);
      // 로그인 페이지로 이동함.
      alert('회원가입 성공! 로그인해주세요');
      navigate('/login');
    } catch (err) {
      console.log('회원가입에 실패하였습니다.', err);
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <AiOutlineArrowLeft className={styles.arrowLeft} onClick={goBack} />
      <label>아이디</label>
      <input
        className="id"
        type="email"
        name="email"
        placeholder="user@example.com"
        value={userData.email}
        onChange={handleInputChange}
      />
      {!isEmailValid && (
        <div className={styles['error-message']}>
          유효한 이메일 주소를 입력하세요.
        </div>
      )}

      <label>비밀번호</label>
      <input
        type="password"
        name="password"
        placeholder="비밀번호"
        value={userData.password}
        onChange={handleInputChange}
      />
      {!isPasswordValid && (
        <div className={styles['error-message']}>
          비밀번호는 4글자 이상이어야 합니다.
        </div>
      )}

      <label>비밀번호 확인</label>
      <input
        type="password"
        name="confirmPassword"
        placeholder="비밀번호 확인"
        value={userData.confirmPassword}
        onChange={handleInputChange}
      />
      <label>이름</label>
      <input
        className="name"
        type="text"
        name="name"
        placeholder="이름"
        value={userData.name}
        onChange={handleInputChange}
      />
      {!isNameValid && (
        <div className={styles['error-message']}>
          이름은 2글자 이상이어야 합니다.
        </div>
      )}
      <label>닉네임</label>
      <input
        className="nickname"
        type="text"
        name="nickname"
        placeholder="닉네임"
        value={userData.nickname}
        onChange={handleInputChange}
      />
      {!isNickNameValid && (
        <div className={styles['error-message']}>
          별명은 2글자 이상이어야 합니다.
        </div>
      )}
      <button type="submit">회원가입</button>
    </form>
  );
};

export default Register;

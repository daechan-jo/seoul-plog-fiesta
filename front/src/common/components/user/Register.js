import styles from './user.module.scss';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineArrowLeft } from "react-icons/ai"
import * as Api from "../../../api"
const Register = () => {
  const navigate = useNavigate();
  //useState로 email 상태를 생성함.
  const [email, setEmail] = useState('');
  //useState로 password 상태를 생성함.
  const [password, setPassword] = useState('');
  //useState로 confirmPassword 상태를 생성함.
  const [confirmPassword, setConfirmPassword] = useState('');
  //useState로 name 상태를 생성함.
  const [name, setName] = useState('');
  //useState로 nickname 상태를 생성함.
  const [nickname, setNickName] = useState('');

  //이메일이 abc@example.com 형태인지 regex를 이용해 확인함.
  const validateEmail = (email) => {
    return email
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      );
  };

  //위 validateEmail 함수를 통해 이메일 형태 적합 여부를 확인함.
  const isEmailValid = validateEmail(email);
  // 비밀번호가 4글자 이상인지 여부를 확인함.
  const isPasswordValid = password.length >= 4;
  // 비밀번호와 확인용 비밀번호가 일치하는지 여부를 확인함.
  const isPasswordSame = password === confirmPassword;
  // 이름이 2글자 이상인지 여부를 확인함.
  const isNameValid = name.length >= 2;
  const isNickNameValid = nickname.length >= 2;
  // 위 4개 조건이 모두 동시에 만족되는지 여부를 확인함.
  const isFormValid =
    isEmailValid && isPasswordValid && isPasswordSame && isNameValid;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // "user/register" 엔드포인트로 post요청함.
      await Api.post("user/register", {
        email,
        password,
        name,
      });

      // 로그인 페이지로 이동함.
      navigate("/login");
    } catch (err) {
      console.log("회원가입에 실패하였습니다.", err);
    }
  };


  const goBack = () => {
    navigate(-1);
  };

  return (
    <form className={styles.container}>
      <AiOutlineArrowLeft className={styles.arrowLeft} onClick={goBack} />
      <label>이름</label>
      <input
        className="name"
        type="text"
        placeholder="이름"
        onChange={(e) => setName(e.target.value)}
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
        placeholder="닉네임"
        onChange={(e) => setNickName(e.target.value)}
      />
      {!isNickNameValid && (
        <div className={styles['error-message']}>
          별명은 2글자 이상이어야 합니다.
        </div>
      )}
      <label>아이디</label>
      <input
        className="id"
        type="email"
        placeholder="user@example.com"
        onChange={(e) => setEmail(e.target.value)}
      />
      {!isEmailValid && (
        <div className={styles['error-message']}>
          유효한 이메일 주소를 입력하세요.
        </div>
      )}

      <label>비밀번호</label>
      <input
        type="password"
        placeholder="비밀번호"
        onChange={(e) => setPassword(e.target.value)}
      />
      {!isPasswordValid && (
        <div className={styles['error-message']}>
          비밀번호는 4글자 이상이어야 합니다.
        </div>
      )}

      <label>비밀번호 확인</label>
      <input
        type="password"
        placeholder="비밀번호 확인"
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      {!isPasswordSame && (
        <div className={styles['error-message']}>
          비밀번호가 일치하지 않습니다.
        </div>
      )}

      <button type="submit" onSubmit={handleSubmit}>
        회원가입
      </button>
    </form>
  );
};

export default Register;

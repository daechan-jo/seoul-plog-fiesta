import styles from "./user.module.scss";
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";


const Login = () => {
  //useState로 email 상태를 생성함.
  const [email, setEmail] = useState("");
  //useState로 password 상태를 생성함.
  const [password, setPassword] = useState("");
  //useState로 confirmPassword 상태를 생성함.
  const [confirmPassword, setConfirmPassword] = useState("");
  //useState로 name 상태를 생성함.
  const [name, setName] = useState("");

  //이메일이 abc@example.com 형태인지 regex를 이용해 확인함.
  const validateEmail = (email) => {
    return email
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
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

  // 위 4개 조건이 모두 동시에 만족되는지 여부를 확인함.
  const isFormValid = isEmailValid && isPasswordValid && isPasswordSame && isNameValid;
  if (!isFormValid) {
    return alert("에러러ㅓ")
  }
  return (
    <form className={styles.container}>
      <label>아이디</label>
      <input className="id" type="email" placeholder="user@example.com" />
      <label>비밀번호</label>
      <input type="password" placeholder="비밀번호" />
      <button type="submit"> 로그인 </button>
      <button type="submit" className="kakaoLogin"> 카카오 로그인</button>
      <button type="submit" className="googleLogin"> 카카오 로그인</button>

    </form>
  );
};

export default Login;

import styles from "./user.module.scss";
import React, { useState, useContext } from "react";
import { useNavigate, useHistory } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai"
//@ts-ignore
// import * as Api from "../../api";
// import { DispatchContext } from "../../App";

const Login = () => {
  const navigate = useNavigate()
  //useState로 email 상태를 생성함.
  const [email, setEmail] = useState("");
  //useState로 password 상태를 생성함.
  const [password, setPassword] = useState("");
  //useState로 confirmPassword 상태를 생성함.
  const [confirmPassword, setConfirmPassword] = useState("");
  // const dispatch = useContext(DispatchContext);

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

  // 위 4개 조건이 모두 동시에 만족되는지 여부를 확인함.
  const isFormValid = isEmailValid && isPasswordValid && isPasswordSame;

  const handleSubmit = async (e) => {
    e.preventDefault();

    //   try {
    //     // "user/login" 엔드포인트로 post요청함.
    //     const res = await Api.post("user/login", {
    //       email,
    //       password,
    //     });
    //     // 유저 정보는 response의 data임.
    //     const user = res.data;
    //     // JWT 토큰은 유저 정보의 token임.
    //     const jwtToken = user.token;
    //     // sessionStorage에 "userToken"이라는 키로 JWT 토큰을 저장함.
    //     sessionStorage.setItem("userToken", jwtToken);
    //     // dispatch 함수를 이용해 로그인 성공 상태로 만듦.
    //     dispatch({
    //       type: "LOGIN_SUCCESS",
    //       payload: user,
    //     });

    //     // 기본 페이지로 이동함.
    //     navigate("/", { replace: true });
    //   } catch (err) {
    //     console.log("로그인에 실패하였습니다.\n", err);
    //   }
  };

  const findPassword = () => {
    navigate("/setpassword")
  }
  // 뒤로가기 버튼 함수
  const goBack = () => {
    navigate(-1);
  };

  // //카카오톡 로그인을 위한 변수들
  const REST_API_KEY = '백엔드한테 달라하자1';
  const REDIRECT_URI = '백엔드한테 달라하자2';
  const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  // 카카오톡 로그인을 위한 loginHandler
  const kakaoLoginHandler = () => {
    window.location.href = link;
  };

  return (
    <form className={styles.container}>
      <AiOutlineArrowLeft className={styles.arrowLeft} onClick={goBack} />
      <label>아이디</label>
      <input className="id" type="email" placeholder="user@example.com" onChange={(e) => setEmail(e.target.value)} />
      {!isEmailValid && <div className={styles["error-message"]}>유효한 이메일 주소를 입력하세요.</div>}

      <label>비밀번호</label>
      <input type="password" placeholder="비밀번호" onChange={(e) => setPassword(e.target.value)} />
      {!isPasswordValid && <div className={styles["error-message"]}>비밀번호는 4글자 이상이어야 합니다.</div>}
      {/* <div className={styles.buttonContainer}> */}
      <button className={styles.localLogin} type="submit" onSubmit={handleSubmit}>로그인 </button>
      <button className={styles.localLogin} onClick={findPassword}>비밀번호 찾기</button>
      <button className={styles.kakaoLogin} onClick={kakaoLoginHandler}>카카오 로그인</button>
      {/* </div> */}
    </form>


  );
};

export default Login;

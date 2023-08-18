import styles from './user.module.scss';
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useHistory } from 'react-router-dom';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import * as Api from '../../../api';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../../features/user/userSlice';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch(); // 리덕스 툴킷을 활용한 상태관리 => store.js 확인

  const user = useSelector((state) => state.user);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  //이메일이 abc@example.com 형태인지 regex를 이용해 확인함.
  const validateEmail = (email) => {
    return email
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      );
  };

  const isEmailValid = validateEmail(email);
  const isPasswordValid = password.length >= 4;

  // 로그인 버튼 클릭 시 토큰을 받아와서 스토리지에 저장 => 상태 업데이트 => 홈페이지 이동
  const handleSubmit = async (e) => {
    e.preventDefault();

    Api.post('auth/login', {
      email,
      password,
    })
      .then((res) => {
        const token = res.data.token;
        sessionStorage.setItem('userToken', token);
        dispatch(login(res.data.data));
        navigate('/', { replace: true });
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const findPassword = () => {
    navigate('/setpassword');
  };
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

  // user의 상태가 존재하면 홈 페이지로 이동시킴
  useEffect(() => {
    if (user.email) {
      navigate('/');
    }
  });

  return (
    <form className={styles.container}>
      <AiOutlineArrowLeft className={styles.arrowLeft} onClick={goBack} />
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
      {/* <div className={styles.buttonContainer}> */}
      <button
        className={styles.localLogin}
        type="submit"
        onSubmit={handleSubmit}
      >
        로그인
      </button>
      <button className={styles.localLogin} onClick={findPassword}>
        비밀번호 찾기
      </button>
      <button className={styles.kakaoLogin} onClick={kakaoLoginHandler}>
        카카오 로그인
      </button>
      {/* </div> */}
    </form>
  );
};

export default Login;

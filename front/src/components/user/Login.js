import styles from './user.module.scss';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import * as Api from '../../api';
import { useDispatch } from 'react-redux';
import { login } from '../../features/user/userSlice';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch(); // 리덕스 툴킷을 활용한 상태관리 => store.js 확인

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

    /*
    {
    "message": "로그인 성공",
    "user": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywibmFtZSI6IuyasOuhnO2XrCIsImVtYWlsIjoiamFoNTEyQG5hdmVyLmNvbSIsImlhdCI6MTY5MjUxNDA5NywiZXhwIjoxNjkyNTI0ODk3LCJpc3MiOiJQaW5lYXBwbGUgUGl6emEifQ.Pr3ax-BZcfJq-rYTH15YF-Tk4DenyXZP_y8vo5OZF-w",
        "email": "jah512@naver.com",
        "nickname": "헬로우"
    }
}
    */
    try {
      const res = await Api.post('/auth/login', {
        email,
        password,
      });
      dispatch(login(res.data));
      alert('로그인 성공!');
      navigate('/?view=main', { replace: true });
    } catch (err) {
      if (err.response && err.response.status === 401) {
        alert('입력하신 회원정보가 없습니다.');
        console.error('입력하신 회원정보가 없습니다.');
      } else {
        alert('로그인 중 오류가 발생했습니다.');
        console.error('로그인 에러 발생', err.message);
      }
    }
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <AiOutlineArrowLeft className={styles.arrowLeft} />
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
      <button className={styles.localLogin} type="submit">
        로그인
      </button>
      <button
        className={styles.localLogin}
        onClick={() => {
          navigate('/setpassword');
        }}
      >
        비밀번호 찾기
      </button>
      <button
        className={styles.localLogin}
        onClick={() => {
          navigate('/register');
        }}
      >
        회원가입 하기
      </button>
      <button className={styles.kakaoLogin}>카카오 로그인</button>
    </form>
  );
};

export default Login;

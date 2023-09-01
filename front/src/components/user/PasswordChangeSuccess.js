import styles from './user.module.scss';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import * as Api from '../../api';
import { validateEmail } from '../../utils';

const PasswordChangeSuccess = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const isEmailValid = validateEmail(email);
  const isPasswordValid = password.length >= 4;
  const isPasswordSame = password === passwordConfirm;
  const isValidForm = isEmailValid && isPasswordSame && isPasswordValid;

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const pwToken = searchParams.get('token');

  useEffect(() => {
    if (!pwToken) {
      navigate('/setpassword');
    }
  }, [navigate, pwToken]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidForm) {
      alert('입력값을 다시 확인해주세요');
      return;
    }
    try {
      await Api.post(`/auth/changePassword`, {
        email,
        password,
        passwordConfirm,
        passwordToken: pwToken,
      });
      alert('비밀번호 변경 성공! 다시 로그인해주세요');
      navigate('/login');
    } catch (err) {
      alert('비밀번호 변경 요청 실패');
      console.log(err);
    }
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <AiOutlineArrowLeft className={styles.arrowLeft} />
      <label>이메일</label>
      <input
        type="email"
        placeholder="user@example.com"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        value={email}
      />
      {!isEmailValid && (
        <div className={styles['error-message']}>
          유효한 이메일 주소를 입력하세요.
        </div>
      )}
      <label>비밀번호</label>
      <input
        type="password"
        placeholder="비밀번호를 입력해주세요"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        value={password}
      />
      {!isPasswordValid && (
        <div className={styles['error-message']}>
          비밀번호는 4글자 이상이어야 합니다.
        </div>
      )}
      <label>비밀번호 확인</label>
      <input
        type="password"
        placeholder="비밀번호를 한번 더 입력 해주세요"
        onChange={(e) => {
          setPasswordConfirm(e.target.value);
        }}
        value={passwordConfirm}
      />
      {!isPasswordSame && (
        <div className={styles['error-message']}>
          비밀번호를 다시 확인해주세요.
        </div>
      )}
      <button type="submit">제출</button>
    </form>
  );
};

export default PasswordChangeSuccess;

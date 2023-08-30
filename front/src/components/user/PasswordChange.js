import styles from './user.module.scss';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import * as Api from '../../api';

const PasswordChange = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !name) {
      alert('입력값을 다시 확인해주세요.');
      return;
    }
    try {
      await Api.post(`/auth/findpassword`, { email, nickname: name });
      alert('비밀번호 변경 요청 성공! 이메일을 확인해주세요');
      navigate('/login');
    } catch (err) {
      alert('비밀번호 변경 요청 실패');
      console.log(err);
    }
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <AiOutlineArrowLeft className={styles.arrowLeft} />
      <label>닉네임</label>
      <input
        type="text"
        placeholder="닉네임"
        onChange={(e) => {
          setName(e.target.value);
        }}
        value={name}
      />
      <label>이메일</label>
      <input
        type="email"
        placeholder="user@example.com"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        value={email}
      />
      <button type="submit">제출</button>
    </form>
  );
};

export default PasswordChange;

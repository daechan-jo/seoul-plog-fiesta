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

    try {
      await Api.post(`/auth/setpassword`, { email, name });
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
      <label>이름</label>
      <input
        type="text"
        placeholder="이름"
        onChange={(e) => {
          setName(e.target.value);
        }}
        value={email}
      />
      <label>이메일</label>
      <input
        type="email"
        placeholder="user@example.com"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        value={name}
      />
      <button type="submit">제출</button>
    </form>
  );
};

export default PasswordChange;

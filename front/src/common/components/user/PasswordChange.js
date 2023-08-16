import styles from './user.module.scss';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import App from "../../App.js"
const PasswordChange = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  return (
    <form className={styles.container}>
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

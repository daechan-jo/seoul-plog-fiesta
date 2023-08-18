import styles from './user.module.scss';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineArrowLeft } from "react-icons/ai"
// import App from "../../App.js"
const PasswordChange = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');



  const goBack = () => {
    navigate(-1);
  };
  return (
    <form className={styles.container}>
      <AiOutlineArrowLeft className={styles.arrowLeft} onClick={goBack} />
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

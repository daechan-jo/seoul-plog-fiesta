import styles from "./user.module.scss";
import React, { useState } from "react"
const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  const [passwordConfirm, setPwConfirm] = useState("")
  const handleSubmit = async (e) => {
    e.preventDefault();
  }
  return (
    <form className={styles.container}>
      <label>id</label>
      <input className="id" type="email" placeholder="user@example.com" />
      <label>pw</label>
      <input type="password" placeholder="비밀번호" />
      <label>pwConfirm</label>
      <input type="password" placeholder="비밀번호 확인" />
      <button type="submit"> 회원가입 </button>
    </form>
  );
};

export default Register;

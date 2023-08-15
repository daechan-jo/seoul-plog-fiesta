import styles from "./user.module.scss";
import React, { useState } from "react";
const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const handleSubmit = async (e) => {
    e.preventDefault();
  }
  return (
    <form className={styles.container}>
      <label>id</label>
      <input className="id" type="email" placeholder="user@example.com" />
      <label>pw</label>
      <input type="password" placeholder="비밀번호" />
    </form>
  );
};

export default Login;

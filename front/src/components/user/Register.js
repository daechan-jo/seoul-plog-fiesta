import styles from "./user.module.scss";

const Register = () => {
  return (
    <form className={styles.container}>
      <label>id</label>
      <input className="wrong" type="text" placeholder="id" />
      <label>pw</label>
      <input type="password" placeholder="pw" />
      <label>pwConfirm</label>
      <input type="password" placeholder="pwConfirm" />
    </form>
  );
};

export default Register;

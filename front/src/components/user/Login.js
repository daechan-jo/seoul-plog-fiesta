import styles from "./user.module.scss";

const Login = () => {
  return (
    <form className={styles.container}>
      <label>id</label>
      <input className="wrong" type="text" placeholder="id" />
      <label>pw</label>
      <input type="password" placeholder="pw" />
    </form>
  );
};

export default Login;

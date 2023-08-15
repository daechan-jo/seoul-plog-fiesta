import styles from './index.module.scss';

const MyUser = () => {
  return (
    <div className={styles.myUser}>
      <div className={styles.titleContainer}>
        <h1>나의 친구들 현황</h1>
        <button className={styles.btn}>친구 관리</button>
      </div>
      <div className={styles.contentContainer}>친구들 넣을겁니다.</div>
    </div>
  );
};

export default MyUser;

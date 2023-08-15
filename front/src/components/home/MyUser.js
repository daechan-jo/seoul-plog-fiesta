import styles from './index.module.scss';

const MyUser = () => {
  return (
    <div className={styles.myUser}>
      <h1>나의 친구들 현황</h1>
      <div className={styles.contentContainer}>친구들 넣을겁니다.</div>
    </div>
  );
};

export default MyUser;

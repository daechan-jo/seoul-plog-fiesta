import styles from './index.module.scss';

const MyGroup = () => {
  return (
    <div className={styles.myGroup}>
      <h1>나의 모임 현황</h1>
      <div className={styles.contentContainer}>모임 넣을겁니다.</div>
    </div>
  );
};

export default MyGroup;

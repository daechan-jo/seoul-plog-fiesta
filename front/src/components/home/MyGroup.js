import styles from './index.module.scss';

const MyGroup = () => {
  return (
    <div className={styles.myGroup}>
      <div className={styles.titleContainer}>
        <h1>나의 모임 현황</h1>
        <button className={styles.btn}>모임 리스트 관리</button>
      </div>
      <div className={styles.contentContainer}>모임 넣을겁니다.</div>
    </div>
  );
};

export default MyGroup;

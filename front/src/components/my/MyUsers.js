import styles from './index.module.scss';

const MyUsers = () => {
  return (
    <div className="gContainer">
      <div className="titleContainer">
        <h1>나의 친구들</h1>
        <button className="gBtn">친구 관리</button>
      </div>
      <div className={styles.shortBox}>친구들 넣을겁니다.</div>
    </div>
  );
};

export default MyUsers;

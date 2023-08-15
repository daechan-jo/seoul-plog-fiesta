import styles from './index.module.scss';

const Map = () => {
  return (
    <div className={styles.map}>
      <div className={styles.titleContainer}>
        <h1>나의 플로깅 지도</h1>
      </div>
      <div className={styles.contentContainer}>지도 넣을겁니다.</div>
    </div>
  );
};

export default Map;

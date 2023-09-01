import { useEffect, useState } from 'react';
import styles from './mylanking.module.scss';
import * as Api from '../../api';

const MyRanking = ({ setIsMyRankingOpen, id, name }) => {
  const [rank, setRank] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await Api.get(`/plo/rank/user?id=${id}`);
        setRank(res.data);
        if (!res.data) {
          setIsMyRankingOpen(false);
          alert('인증글이 없습니다. 인증글을 작성해주세요.');
          return;
        }
      } catch (err) {
        console.log('순위데이터를 불러오는데 실패.', err.response.data.message);
      }
    };
    getData();
  }, [id, rank, setIsMyRankingOpen]);

  useEffect(() => {
    const toast = setTimeout(() => {
      setIsMyRankingOpen(false);
    }, 3500);

    return () => clearTimeout(toast);
  }, [setIsMyRankingOpen]);

  return (
    <div
      className={rank ? styles.frame : `${styles.frame} ${styles.frameBlock}`}
    >
      <div className={styles.circle}></div>
      <div className={`${styles.line} ${styles.left}`}></div>
      <div className={`${styles.line} ${styles.right}`}></div>
      <div className={`${styles.bracket} ${styles.left}`}></div>
      <div className={`${styles.bracket} ${styles.right}`}></div>
      <div className={`${styles.small} ${styles.top}`}>
        {name}의 현재 순위는?
      </div>
      <div className={styles.big}>{rank && `${rank} 위`}</div>
      <div className={`${styles.small} ${styles.bottom}`}>
        Seoul Flog Fiesta
      </div>
      <div className={`${styles.hide} ${styles.top}`}></div>
      <div className={`${styles.hide} ${styles.bottom}`}></div>
    </div>
  );
};

export default MyRanking;

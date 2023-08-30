import { useEffect, useState } from 'react';
import styles from './mylanking.module.scss';
import * as Api from '../../api';

const MyLanking = ({ setIsMyRankingOpen, id, name }) => {
  const [rank, setLank] = useState();

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await Api.get(`/plo/rank/${id}`);

        setLank(res.data);
      } catch (err) {
        console.log('순위데이터를 불러오는데 실패.', err);
      }
    };
    getData();
  }, [id]);
  useEffect(() => {
    const toast = setTimeout(() => {
      setIsMyRankingOpen(false);
    }, 4000);

    return () => clearTimeout(toast);
  });

  if (!rank) {
    alert('인증글이 없습니다. 인증글을 작성해주세요.');
    setIsMyRankingOpen(false);
    return;
  }
  return (
    <div class={styles.frame}>
      <div class={styles.circle}></div>
      <div class={`${styles.line} ${styles.left}`}></div>
      <div class={`${styles.line} ${styles.right}`}></div>
      <div class={`${styles.bracket} ${styles.left}`}></div>
      <div class={`${styles.bracket} ${styles.right}`}></div>
      <div class={`${styles.small} ${styles.top}`}>{name}의 현재 순위는?</div>
      <div class={styles.big}>{rank && `${rank} 위`}</div>
      <div class={`${styles.small} ${styles.bottom}`}>Seoul Flog Fiesta</div>
      <div class={`${styles.hide} ${styles.top}`}></div>
      <div class={`${styles.hide} ${styles.bottom}`}></div>
    </div>
  );
};

export default MyLanking;

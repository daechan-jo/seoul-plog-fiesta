import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Api from '../../api';
import styles from './index.module.scss';

const All = ({ view }) => {
  const [isFetching, setIsFetching] = useState(false);
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        setIsFetching(true);
        const res = await Api.get('/plo/hundred');
        setDatas(res.data);
      } catch (err) {
        console.log('100명 순위데이터를 불러오는데 실패.', err);
      } finally {
        setIsFetching(false);
      }
    };

    getData();
  }, [view]);

  return (
    <div className="gContainer  gList navVh">
      <div className="titleContainer">
        <h1>Top 100</h1>
      </div>
      <div className={styles.ranking}>
        {isFetching ? (
          <div>로딩중</div>
        ) : datas?.length === 0 ? (
          <div>데이터가 없습니다.</div>
        ) : (
          datas.map((data) => <Item data={data} key={data.id} view={view} />)
        )}
      </div>
    </div>
  );
};

export default All;

/*
    {
        "id": 5,
        "nickname": "124",
        "activity": "seodaemun",
        "score": 2800,
        "rank": 1,
        "postCount": 8
    },
*/

const Item = ({ data, view }) => {
  const navigator = useNavigate();

  return (
    <div
      className={styles.rankingItem}
      onClick={() => {
        navigator(`/users/${data.id}`);
      }}
    >
      <div>{data.rank}위</div>
      <div>{data.nickname}</div>
      <div>{data.score}점</div>
      <div>{data.postCount}개 인증</div>
    </div>
  );
};

import React from 'react';
import styles from './index.module.scss';
import { useNavigate } from 'react-router-dom';

const TopGroup = ({ isFetching, datas }) => {
  return (
    <div className="gContainer">
      <div className="titleContainer">
        <h1>상위 모임</h1>
      </div>
      <div className={`contentMinContainer ${styles.shortBox}`}>
        {isFetching ? (
          <div>로딩중</div>
        ) : datas.length === 0 ? (
          <div>데이터가 없습니다</div>
        ) : (
          datas.map((data) => <Item key={data.id} data={data} />)
        )}
      </div>
    </div>
  );
};

export default TopGroup;

const Item = ({ data }) => {
  //{ id: '1', name: '모임이름1', score: 100 },
  const navigator = useNavigate();

  return (
    <div
      className={styles.listItem}
      onClick={() => {
        //navigator(`/users/${data.id}?view=main`);
      }}
    >
      <div>{data.rank}위</div>
      <div>{data.score}점</div>
      <div>{data.name}</div>
    </div>
  );
};

import React, { useEffect, useState } from 'react';
import * as Api from '../../api';
import styles from './index.module.scss';
import { useNavigate } from 'react-router-dom';

const TopUser = ({ isFetching, datas }) => {
  console.log('topuser: ', datas);
  return (
    <div className="gContainer">
      <div className="titleContainer">
        <h1>상위 유저</h1>
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

export default TopUser;

/*
          "id": 3,
          "name": "KIA",
          "nickname": "타이거즈",
          "activity": null,
          "profileImage": null,
          "score": 353,
          "rank": 5,
          "postCount": 1
*/

const Item = ({ data }) => {
  const navigator = useNavigate();

  return (
    <div
      className={styles.listItem}
      onClick={() => {
        navigator(`/users/${data.id}?view=main`);
      }}
    >
      <div>{data.rank}위</div>
      <div>{data.score}점</div>
      <div>{data.nickname}</div>
    </div>
  );
};

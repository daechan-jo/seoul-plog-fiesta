import React, { useEffect, useState } from 'react';
import * as Api from '../../api';
import { handleCreatedDate } from '../../utils/handleCreatedDate';
import styles from './index.module.scss';

const MyGroup = () => {
  const [datas, setDatas] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        setIsFetching(true);
        const res = await Api.get(`/group/certpost`);
        setDatas(
          res.data.posts.length >= 5
            ? res.data.posts.slice(0, 5)
            : res.data.posts,
        );
      } catch (err) {
        console.log('모임데이터를 불러오는데 실패.', err);
        setDatas([]);
      } finally {
        setIsFetching(false);
      }
    };

    getData();
  }, []);

  return (
    <div className="gContainer">
      <div className="titleContainer">
        <h1>나의 모임 현황</h1>
      </div>
      <div className={styles.userList}>
        {isFetching ? (
          <div>로딩중</div>
        ) : datas.length === 0 ? (
          <div>데이터가 없습니다</div>
        ) : (
          datas.map((data, index) => (
            <Item key={data.id} data={data} order={index + 1} />
          ))
        )}
      </div>
    </div>
  );
};

export default MyGroup;

const Item = ({ data, order }) => {
  return (
    <div className={styles.groupItem}>
      <div>{order}</div>
      <h2>{data.title}</h2>
      <div>{handleCreatedDate(data.createdAt)}</div>
    </div>
  );
};
/*
{
  "id": 77,
  "writerId": 103,
  "title": "무야호야호",
  "region": "gangdong",
  "location": "dongjak",
  "distance": "6",
  "trashAmount": "1",
  "averagePace": "4",
  "description": "줍줍",
  "startTime": "10:00",
  "endTime": "12:00",
  "createdAt": "2023-08-29T00:26:17.665Z",
  "isGroupPost": true,
  "groupName": "나혼자그룹"
},*/

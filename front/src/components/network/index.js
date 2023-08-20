import React, { useEffect, useState } from 'react';
import GroupMaking from './GroupMaking';
import { useNavigate } from 'react-router-dom';
import styles from './index.module.scss';
import * as Api from '../../api';
import post_none from '../../assets/post_none.png';

const ItemList = ({ view }) => {
  const [isModal, setIsModal] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        setIsFetching(true);

        if (view === 'group') {
          const res = await Api.get(`/${view}`);
          setDatas(res.data);
        } else {
          const res = await Api.get(`/${view}s`);
          setDatas(res.data);
        }
      } catch (err) {
        console.log('데이터를 불러오는데 실패.', err);
      } finally {
        setIsFetching(false);
      }
    };

    getData();
  }, [view]);

  return (
    <div className="gContainer  gList navVh">
      {isModal && <GroupMaking setIsModal={setIsModal} setDatas={setDatas} />}
      <NetworkHeader setIsModal={setIsModal} />
      <div className="contentListContainer">
        {isFetching ? (
          <div>로딩중</div>
        ) : datas?.length === 0 ? (
          <div>데이터가 없습니다.</div>
        ) : (
          datas.map((data) => <Item data={data} key={data.id} view={view} />)
        )}
      </div>
      <div>페이지네이션자리</div>
    </div>
  );
};

export default ItemList;

// 재렌더링 방지
const NetworkHeader = React.memo(({ setIsModal }) => {
  return (
    <div className="titleContainer">
      <h1>유저리스트</h1>
      <button
        className="gBtn"
        onClick={() => {
          setIsModal(true);
        }}
      >
        모임 만들기
      </button>
    </div>
  );
});

const Item = ({ data, view }) => {
  const navigator = useNavigate();
  /*
  {
     imgUrl: 'http://placekitten.com/200/200',
    id: 8,
    name: 'group test1',
    managerId: 7,
    goal: '잘먹고잘자기',
    region: '써울',
    memberLimit: 50,
    data.: 2,
  },
  */

  return (
    <div
      className={styles.itemContainer}
      onClick={() => {
        navigator(`/${view}/${data.id}`);
      }}
    >
      <div key={data.id}>
        <img src={data.imgUrl || post_none} alt="그룹 이미지" />
      </div>
      <ul className={styles.item}>
        <li key={data.name}>
          <label>{view} 이름</label>
          <div>{data.name}</div>
        </li>
        <li key={data.goal}>
          <label>그룹 목표</label>
          <div>{data.goal}</div>
        </li>
        <li key={data.region}>
          <label>그룹지역</label>
          <div>{data.region}</div>
        </li>
        <div>
          <div>
            {data.memberCount} / {data.memberLimit}
          </div>
        </div>
      </ul>
    </div>
  );
};

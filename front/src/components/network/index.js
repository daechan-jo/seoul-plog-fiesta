import React, { useEffect, useState } from 'react';
import GroupMaking from './GroupMaking';
import { useNavigate } from 'react-router-dom';
import styles from './index.module.scss';
import * as Api from '../../api';
import post_none from '../../assets/post_none.png';
import user_none from '../../assets/user_none.png';

const ItemList = ({ view }) => {
  const [isModal, setIsModal] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [datas, setDatas] = useState([]);
  const [isCheck, setIsCheck] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        setIsFetching(true);

        if (!view || view === 'group') {
          if (isCheck) {
            const res = await Api.get(`/${view}/mygroup`);
            setDatas(res.data);
          } else {
            const res = await Api.get(`/${view}`);
            setDatas(res.data);
          }
        } else {
          if (isCheck) {
            const res = await Api.get(`/user/friend`);
            setDatas(res.data);
          } else {
            const res = await Api.get(`/${view}s`);
            setDatas(res.users);
          }
        }
      } catch (err) {
        console.log('데이터를 불러오는데 실패.', err);
      } finally {
        setIsFetching(false);
      }
    };

    getData();
  }, [view, isCheck]);

  return (
    <div className="gContainer  gList navVh">
      {isModal && <GroupMaking setIsModal={setIsModal} setDatas={setDatas} />}
      <NetworkHeader setIsModal={setIsModal} setIsCheck={setIsCheck} />
      <div className="contentListContainer">
        {isFetching ? (
          <div>로딩중</div>
        ) : datas.length === 0 ? (
          <div>데이터가 없습니다.</div>
        ) : (
          datas.map((data) => (
            <Item data={data} key={`${view}_${data.id}`} view={view} />
          ))
        )}
      </div>
      <div>페이지네이션자리</div>
    </div>
  );
};

export default ItemList;

// 재렌더링 방지
const NetworkHeader = React.memo(({ setIsModal, setIsCheck }) => {
  return (
    <div className="titleContainer">
      <div>
        <h1>유저리스트</h1>
        <span>
          <input type="checkbox" name="isMine" onClick={setIsCheck} />
          <div>나의 그룹만 보기</div>
        </span>
      </div>
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
        navigator(`/${view}s/${data.id}?view=main`);
      }}
    >
      <div key={data.id}>
        <img
          src={data.imgUrl || view === 'group' ? post_none : user_none}
          alt="그룹 이미지"
        />
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

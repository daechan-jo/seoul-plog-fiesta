import React, { useEffect, useState } from 'react';
import GroupMaking from './GroupMaking';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './index.module.scss';
import * as Api from '../../api';
import post_none from '../../assets/post_none.png';
import user_none from '../../assets/user_none.png';
import { seoulDistricts } from '../common/exportData';

const ItemList = () => {
  const [isModal, setIsModal] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [datas, setDatas] = useState([]);
  const [isCheck, setIsCheck] = useState(false);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const view = searchParams.get('view');
  console.log(view);
  useEffect(() => {
    const getData = async () => {
      try {
        setIsFetching(true);

        if (!view || view === 'group') {
          if (isCheck) {
            const res = await Api.get(`/${view}/mygroup`);
            const resGroupIds = res.data.map((data) => data.groupId);
            setDatas(datas.filter((data) => resGroupIds.includes(data.id)));
          } else {
            const res = await Api.get(`/${view}`);
            setDatas(res.data);
          }
        } else {
          if (isCheck) {
            const res = await Api.get(`/user/friend`);
            if (!res.data.searchNickname) {
              setDatas([]);
            } else {
              setDatas(res.data.searchNickname);
            }
          } else {
            const res = await Api.get(`/${view}s`);
            setDatas(res.data.users);
          }
        }
      } catch (err) {
        console.log('데이터를 불러오는데 실패.', err);
      } finally {
        setIsFetching(false);
      }
    };

    getData();
  }, [view, isCheck, setIsCheck]);

  return (
    <div className="gContainer  gList navVh">
      {isModal && <GroupMaking setIsModal={setIsModal} setDatas={setDatas} />}
      <NetworkHeader
        view={view}
        setIsModal={setIsModal}
        setIsCheck={setIsCheck}
      />
      <div className="contentListContainer">
        {isFetching ? (
          <div>로딩중</div>
        ) : datas.length === 0 ? (
          <div>데이터가 없습니다.</div>
        ) : (
          datas.map((data) => (
            <Item view={view} data={data} key={`${view}_${data.id}`} />
          ))
        )}
      </div>
      <div>페이지네이션자리</div>
    </div>
  );
};

export default ItemList;

const NetworkHeader = ({ view, setIsModal, setIsCheck }) => {
  return (
    <div className="titleContainer">
      <div>
        <h1>{view === 'group' ? '그룹' : '유저'}리스트</h1>
        <span>
          <input
            type="checkbox"
            name="isMine"
            onClick={() => {
              setIsCheck((isCheck) => !isCheck);
            }}
          />
          <div>나의 {view === 'group' ? '그룹' : '유저'}만 보기</div>
        </span>
      </div>
      {view === 'group' && (
        <button
          className="gBtn"
          onClick={() => {
            setIsModal(true);
          }}
        >
          모임 만들기
        </button>
      )}
    </div>
  );
};

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

  console.log(data);
  return (
    <div
      className={styles.itemContainer}
      onClick={() => {
        navigator(`/${view}s/${data.id}?admin=${data.managerId}&view=main`);
      }}
    >
      <div className={styles.imgContainer} key={data.id}>
        <img
          src={
            data.images
              ? `http://localhost:3002${data.images[0]}`
              : view === 'group'
              ? post_none
              : user_none
          }
          alt="그룹 이미지"
        />
      </div>
      <ul className={styles.item}>
        <li key={view === 'group' ? data.name : data.nickname}>
          <label>{view === 'group' ? '그룹이름' : '유저별명'}</label>
          <div>{view === 'group' ? data.name : data.nickname}</div>
        </li>
        <li key={view === 'group' ? data.goal : data.about}>
          <label>{view === 'group' ? '그룹목표' : '유저소개'}</label>
          <div>{view === 'group' ? data.goal : data.about}</div>
        </li>
        <li key={view === 'group' ? data.region : data.activity}>
          <label>{view === 'group' ? '그룹지역' : '유저활동'}</label>
          <div>
            {view === 'group'
              ? seoulDistricts[data.region]
              : seoulDistricts[data.activity]}
          </div>
        </li>
        <div>
          {view === 'group' && (
            <div>
              {data.memberCount} / {data.memberLimit}
            </div>
          )}
        </div>
      </ul>
    </div>
  );
};

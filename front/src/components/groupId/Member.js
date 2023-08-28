import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import * as Api from '../../api';
import { useSelector } from 'react-redux';
import { seoulDistricts } from '../common/exportData';
import styles from './index.module.scss';

const GroupMember = ({ view }) => {
  const [isFetching, setIsFetching] = useState(false);
  const [datas, setDatas] = useState([]);

  const { groupId } = useParams();

  const user = useSelector((state) => state.user);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const adminValue = searchParams.get('admin');
  const isGroupAdmin = parseInt(adminValue) === user.loginId;
  const isMember = user.groups.includes(groupId);

  const navigator = useNavigate();

  const handleGroupDelete = async () => {
    try {
      await Api.delete(`/group/drop/${groupId}`);
      navigator('/network?view=group');
    } catch (err) {
      console.log('그룹 삭제 실패.', err);
    }
  };

  const handleGroupRequest = async () => {
    try {
      await Api.post(`/group/join/${groupId}`);
      alert('가입 요청 성공');
    } catch (err) {
      alert(err.message ? err.message : '가입 요청 실패.');
    }
  };
  useEffect(() => {
    const getData = async () => {
      try {
        setIsFetching(true);
        const res = await Api.get(`/group/${groupId}`);
        setDatas(res.data.groupUser);
      } catch (err) {
        console.log('멤버 리스트 데이터를 불러오는데 실패.', err);
      } finally {
        setIsFetching(false);
      }
    };

    getData();
  }, [groupId]);

  return (
    <div className="gContainer  gList navVh">
      <div className="titleContainer">
        <h1>멤버 리스트</h1>
        {isGroupAdmin && (
          <button className="gBtn" onClick={handleGroupDelete}>
            그룹 삭제하기
          </button>
        )}
        {!isGroupAdmin && !isMember && (
          <button className="gBtn" onClick={handleGroupRequest}>
            가입 요청하기
          </button>
        )}
      </div>
      <div className={styles.memberList}>
        {isFetching ? (
          <div>로딩중</div>
        ) : datas?.length === 0 ? (
          <div>데이터가 없습니다.</div>
        ) : (
          datas.map((data) => (
            <Item
              data={data.user}
              setDatas={setDatas}
              groupId={groupId}
              key={data.name}
              view={view}
              isGroupAdmin={isGroupAdmin}
            />
          ))
        )}
      </div>
      <div>페이지네이션자리</div>
    </div>
  );
};

export default GroupMember;

const Item = ({ data, isGroupAdmin, groupId, setDatas }) => {
  const navigator = useNavigate();
  const user = useSelector((state) => state.user);

  const handleOut = async () => {
    try {
      await Api.delete(`/group/${groupId}/${data.id}`);
      setDatas((prev) => prev.filter((datas) => data.id !== datas.id));
    } catch (err) {
      console.log('멤버 추방 실패.', err);
    }
  };
  return (
    <div
      className={styles.memberItem}
      onClick={() => {
        navigator(`/users/${data.id}`);
      }}
    >
      <div>{data.nickname}</div>
      <div>{data.about}</div>
      <div>{seoulDistricts[data.activity]}</div>
      {isGroupAdmin && data.id !== user.loginId && (
        <button onClick={handleOut}>X</button>
      )}
    </div>
  );
};

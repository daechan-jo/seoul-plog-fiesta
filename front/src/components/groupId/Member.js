import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Api from '../../api';
import { GroupIdContext } from '../../context/groupIdContext';

const GroupMember = ({ view }) => {
  const [isFetching, setIsFetching] = useState(false);
  const [datas, setDatas] = useState([]);

  const { groupId } = useContext(GroupIdContext);
  useEffect(() => {
    const getData = async () => {
      try {
        setIsFetching(true);
        const res = await Api.get(`/group/${groupId}`);
        setDatas(res.data.GroupUser);
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
      </div>
      <div className="contentListContainer">
        {isFetching ? (
          <div>로딩중</div>
        ) : datas?.length === 0 ? (
          <div>데이터가 없습니다.</div>
        ) : (
          datas.map((data) => (
            <Item data={data.user} key={data.user.id} view={view} />
          ))
        )}
      </div>
      <div>페이지네이션자리</div>
    </div>
  );
};

export default GroupMember;

const Item = ({ data, view }) => {
  const navigator = useNavigate();

  return (
    <div
      onClick={() => {
        navigator(`/users/${data.id}`);
      }}
    >
      <div>{data.name}</div>
      <div>{data.nickname}</div>
    </div>
  );
};

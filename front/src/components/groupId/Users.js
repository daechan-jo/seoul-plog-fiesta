import React, { useContext, useEffect, useState } from 'react';
import * as Api from '../../api';
import { GroupIdContext } from '../../context/groupIdContext';
import { useParams } from 'react-router-dom';

const GroupUsers = () => {
  return (
    <div className="gContainer">
      <div className="titleContainer">
        <h1>인증 현황</h1>
        <button className="gBtn">인증글 바로가기</button>
      </div>
      <List />
    </div>
  );
};

export default GroupUsers;

const List = () => {
  const { groupId } = useParams();

  const [datas, setDatas] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

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
    <div className="contentMinContainer">
      {isFetching ? (
        <div>로딩중</div>
      ) : datas.length === 0 ? (
        <div>데이터가 없습니다</div>
      ) : (
        datas.map((data) => <Item key={`${data.userId}`} data={data} />)
      )}
    </div>
  );
};

const Item = ({ data }) => {
  return <div>data입니다.</div>;
};

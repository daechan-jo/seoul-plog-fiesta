import React, { useEffect, useState } from 'react';
import * as Api from '../../api';

const GroupUsers = () => {
  return (
    <div className="gContainer">
      <div className="titleContainer">
        <h1>멤버 리스트</h1>
        <button className="gBtn">모임 리스트 관리</button>
        <List />
      </div>
    </div>
  );
};

export default React.memo(GroupUsers);

const List = () => {
  const [datas, setDatas] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        setIsFetching(true);
        const res = await Api.get('');
        setDatas(res.data);
      } catch (err) {
        console.log('그룹유저데이터불러오기 실패', err);
      } finally {
        setIsFetching(false);
      }
    };

    getData();
  }, []);

  return (
    <div className="contentMinContainer">
      {isFetching ? (
        <div>로딩중</div>
      ) : (
        datas.map((data) => (
          <Item key={`group_page ${data.groupId}`} data={data} />
        ))
      )}
    </div>
  );
};

const Item = ({ data }) => {
  return <div>data입니다.</div>;
};

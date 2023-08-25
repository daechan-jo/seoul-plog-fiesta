import React, { useEffect, useState } from 'react';
import * as Api from '../../api';

const TopGroup = () => {
  //{ id: '1', name: '모임이름1', score: 100 },

  const [datas, setDatas] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        setIsFetching(true);
        //const res = await Api.get(``);
        //setDatas(res.data);
      } catch (err) {
        console.log('상위모임데이터를 불러오는데 실패.', err);
      } finally {
        setIsFetching(false);
      }
    };

    getData();
  }, []);

  return (
    <div className="gContainer">
      <div className="titleContainer">
        <h1>상위 모임</h1>
      </div>
      <div className="contentListContainer">
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

export default React.memo(TopGroup);

const Item = () => {
  //{ id: '1', name: '모임이름1', score: 100 },

  return (
    <div>
      <div>id</div>
      <div>name</div>
      <div>score</div>
    </div>
  );
};

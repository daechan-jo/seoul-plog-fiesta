import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Api from '../../api';

const MessageList = ({ view }) => {
  const [isFetching, setIsFetching] = useState(false);
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        setIsFetching(true);
        //const res = await Api.get(``);
        //setDatas(res.data);
      } catch (err) {
        console.log(
          '나의 쪽지함 데이터를 불러오는데 실패.',
          err.response.data.message,
        );
      } finally {
        setIsFetching(false);
      }
    };

    getData();
  }, [view]);

  return (
    <div className="gContainer  gList navVh">
      <div className="titleContainer">
        <h1>나의 쪽지함</h1>
      </div>
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

export default MessageList;

const Item = ({ data, view }) => {
  const navigator = useNavigate();

  return (
    <div
      onClick={() => {
        navigator(`/posts/${data.id}`);
      }}
    >
      <div>나의 인증1</div>
      <div>장소</div>
    </div>
  );
};

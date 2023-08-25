import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Api from '../../api';

const GroupPlogging = ({ view }) => {
  const [isFetching, setIsFetching] = useState(false);
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        setIsFetching(true);
        //const res = await Api.get(``);
        //setDatas(res.data);
      } catch (err) {
        console.log('인증글 데이터를 불러오는데 실패.', err);
      } finally {
        setIsFetching(false);
      }
    };

    getData();
  }, [view]);

  return (
    <div className="gContainer  gList navVh">
      <div className="titleContainer">
        <h1>인증글 모아보기</h1>
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

export default GroupPlogging;

const Item = ({ data, view }) => {
  const [isModal, setIsModal] = useState(false);

  return (
    <div
      onClick={() => {
        setIsModal(true);
      }}
    >
      {isModal && <PostItem id={data.id} setIsModal={setIsModal} />}
      <div>그룹 인증1</div>
      <div>장소</div>
    </div>
  );
};

const PostItem = ({ id, setIsModal }) => {
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        setIsFetching(true);
        //const res = await Api.get(``);
        //setDatas(res.data);
      } catch (err) {
        console.log('공지사항 데이터를 불러오는데 실패.', err);
      } finally {
        setIsFetching(false);
      }
    };

    getData();
  }, []);

  return (
    <div className="modal">
      <div>그룹 인증1</div>
      <div>장소</div>
      <button>back</button>
      <button>뒤로가기</button>
    </div>
  );
};

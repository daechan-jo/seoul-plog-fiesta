import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as Api from '../../api';
import Writing from './Writing';
import styles from './index.module.scss';

const Notice = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [datas, setDatas] = useState([]);
  const [isModal, setIsModal] = useState(false);

  const { groupId } = useParams();

  useEffect(() => {
    const getData = async () => {
      try {
        setIsFetching(true);
        const res = await Api.get(`/group/posts/${groupId}`);
        console.log(res);
        setDatas(res.data);
      } catch (err) {
        console.log('공지사항 데이터를 불러오는데 실패.', err);
      } finally {
        setIsFetching(false);
      }
    };

    getData();
  }, [groupId]);

  return (
    <>
      {isModal && <Writing setIsModal={setIsModal} />}
      <div className="gContainer  gList navVh">
        <div className="titleContainer">
          <h1>그룹게시판</h1>
          <button
            className="gBtn"
            onClick={() => {
              setIsModal(true);
            }}
          >
            글쓰기
          </button>
        </div>
        <div className="contentListContainer">
          {isFetching ? (
            <div>로딩중</div>
          ) : datas?.length === 0 ? (
            <div>데이터가 없습니다.</div>
          ) : (
            datas.map((data) => <Item data={data} key={data.id} />)
          )}
        </div>
        <div>페이지네이션자리</div>
      </div>
    </>
  );
};

export default Notice;

const Item = ({ data }) => {
  const navigator = useNavigate();
  const [isModal, setIsModal] = useState(false);

  return (
    <div
      className={styles.notice}
      onClick={() => {
        setIsModal(true);
      }}
    >
      {isModal && (
        <PostItem
          key={`group_post_${data.id}`}
          id={data.id}
          setIsModal={setIsModal}
        />
      )}
      <div>{data.title}</div>
      <div>{data.content}</div>
    </div>
  );
};

const PostItem = ({ id, setIsModal }) => {
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        setIsFetching(true);
        const res = await Api.get(``);
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
      <div>나의 인증1</div>
      <div>장소</div>
      <button>back</button>
      <button>뒤로가기</button>
    </div>
  );
};

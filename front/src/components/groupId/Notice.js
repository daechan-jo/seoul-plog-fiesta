import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import * as Api from '../../api';
import Writing from './Writing';
import styles from './index.module.scss';
import { useSelector } from 'react-redux';
import Pagination from '../common/Pagenation';
import { handlePagenation } from '../../utils/pagenation';
import { GroupIdContext } from '../../containers/groupId';

const Notice = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [datas, setDatas] = useState([]);
  const [isModal, setIsModalOpen] = useState(false);

  const { isMember } = useContext(GroupIdContext);
  const { groupId } = useParams();

  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);

  const paginatedData = handlePagenation(datas, currentPage, itemsPerPage);

  const handlePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

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
      {isModal && (
        <Writing setIsModalOpen={setIsModalOpen} setDatas={setDatas} />
      )}
      <div className="gContainer  gList navVh">
        <div className="titleContainer">
          <h1>그룹게시판</h1>
          {isMember && (
            <button
              className="gBtn"
              onClick={() => {
                setIsModalOpen(true);
              }}
            >
              글쓰기
            </button>
          )}
        </div>
        <div className="contentListContainer">
          {isFetching ? (
            <div>로딩중</div>
          ) : datas?.length === 0 ? (
            <div>데이터가 없습니다.</div>
          ) : (
            paginatedData.map((data) => (
              <Item data={data} setDatas={setDatas} key={data.id} />
            ))
          )}
        </div>
        <div>
          {(datas || datas.length >= 0) && (
            <Pagination
              totalPages={Math.ceil(datas.length / itemsPerPage)}
              currentPage={currentPage}
              handlePage={handlePage}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Notice;

const Item = ({ data, setDatas }) => {
  const navigator = useNavigate();
  const [isModal, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [sendData, setSendData] = useState(data);

  const user = useSelector((state) => state.user);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSendData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEditSubmit = async () => {
    try {
      const res = await Api.put(`/group/post/put/${data.id}`, {
        title: sendData.title,
        content: sendData.content,
        isNotice: sendData.isNotice,
      });
      setDatas((prev) =>
        prev.map((item) => item.id === res.data.id && res.data),
      );
      setIsEditing(false);
    } catch (err) {
      console.log('수정실패');
    }
  };

  const handleDelete = async () => {
    try {
      await Api.delete(`/group/post/delete/${data.id}`, sendData);
      setDatas((prev) => prev.filter((pre) => pre.id !== data.id));
      setIsEditing(false);
    } catch (err) {
      console.log('삭제실패');
    }
  };

  return (
    <div className={styles.notice}>
      {data.isNotice && <div className={styles.isNotice}>공지사항</div>}
      <div className={styles.content}>
        <label>제목</label>
        {isEditing ? (
          <input
            type="text"
            name="title"
            value={sendData.title}
            onChange={handleInputChange}
          />
        ) : (
          <div>{data?.title}</div>
        )}
      </div>
      <div className={styles.content}>
        <label>날짜</label>
        <div>{data?.createdAt.split('T')[0]}</div>
      </div>
      <div className={styles.content}>
        <label>내용</label>
        {isEditing ? (
          <input
            type="text"
            name="content"
            value={sendData.content}
            onChange={handleInputChange}
          />
        ) : (
          <div>{data?.content}</div>
        )}
      </div>
      {data.writerId === user.loginId &&
        (isEditing ? (
          <div className={styles.postBtns}>
            <button className="gBtn" onClick={handleEditSubmit}>
              수정완료
            </button>
            <button
              className="gBtn"
              onClick={() => {
                setIsEditing(false);
              }}
            >
              수정취소
            </button>
          </div>
        ) : (
          <div className={styles.postBtns}>
            <button
              className="gBtn"
              onClick={() => {
                setIsEditing(true);
              }}
            >
              수정하기
            </button>
            <button className="gBtn" onClick={handleDelete}>
              삭제하기
            </button>
          </div>
        ))}
    </div>
  );
};

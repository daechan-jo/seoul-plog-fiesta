import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Api from '../../api';
import { handlePagenation } from '../../utils/pagenation';
import Pagination from '../common/Pagenation';
import PloggingShow from '../common/PlogginShow';
import { handleCreatedDate } from '../../utils/handleCreatedDate';
import styles from './index.module.scss';
import { GroupIdContext } from '../../pages/GroupIdPage';

const GroupPlogging = ({ view }) => {
  const [isFetching, setIsFetching] = useState(false);
  const [datas, setDatas] = useState([]);

  const { name } = useContext(GroupIdContext);

  const itemsPerPage = 20;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const paginatedData = handlePagenation(datas, currentPage, itemsPerPage);

  const handlePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        setIsFetching(true);
        const res = await Api.get(`/group/certpost/${name}`);
        if (res.data.posts === '인증게시글 없음') {
          setDatas([]);
        } else {
          setDatas(res.data.posts);
          setTotalPages(res.data.totalPages);
        }
      } catch (err) {
        console.log(
          '인증글 데이터를 불러오는데 실패.',
          err.response.data.message,
        );
      } finally {
        setIsFetching(false);
      }
    };

    getData();
  }, [name, view]);

  return (
    <div className="gContainer  gList navVh">
      <div className="titleContainer">
        <h1>인증글 모아보기</h1>
      </div>
      <div className={styles.postList}>
        {isFetching ? (
          <div>로딩중</div>
        ) : datas?.length === 0 ? (
          <div>데이터가 없습니다.</div>
        ) : (
          paginatedData.map((data, index) => (
            <Item data={data} key={data.id} view={view} order={index + 1} />
          ))
        )}
      </div>
      <div>
        <Pagination
          totalPages={Math.ceil(datas.length / itemsPerPage)}
          currentPage={currentPage}
          handlePage={handlePage}
        />
      </div>
    </div>
  );
};

export default GroupPlogging;

const Item = ({ data, order }) => {
  const [isPlogginShowOpen, setIsPlogginShowOpen] = useState(false);

  return (
    <>
      {isPlogginShowOpen && (
        <PloggingShow
          id={data.id}
          setIsPlogginShowOpen={setIsPlogginShowOpen}
        />
      )}
      <div
        className={styles.postItem}
        onClick={() => {
          setIsPlogginShowOpen(true);
        }}
      >
        <div>{order}</div>
        <div>|</div>
        <div>{data.title}</div>
        <div>{handleCreatedDate(data.createdAt)}</div>
      </div>
    </>
  );
};

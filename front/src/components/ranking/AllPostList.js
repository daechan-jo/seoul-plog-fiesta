import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Api from '../../api';
import styles from './index.module.scss';
import { handleCreatedDate } from '../../utils/handleCreatedDate';
import Pagination from '../common/Pagenation';
import { handlePagenation } from '../../utils/pagenation';
import PloggingShow from '../common/PlogginShow';

const AllPostList = ({ view }) => {
  const [isFetching, setIsFetching] = useState(false);
  const [datas, setDatas] = useState([]);

  const itemsPerPage = 20;
  const [currentPage, setCurrentPage] = useState(1);

  const paginatedData = handlePagenation(datas, currentPage, itemsPerPage);

  const handlePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        setIsFetching(true);
        const res = await Api.get(`/plo/post`);
        setDatas(res.data);
      } catch (err) {
        console.log('모든 인증글 데이터를 불러오는데 실패.', err);
      } finally {
        setIsFetching(false);
      }
    };

    getData();
  }, [view]);

  return (
    <div className="gContainer  gList navVh">
      <div className="titleContainer">
        <h1>모든 인증글</h1>
      </div>
      <div className={styles.allPostList}>
        {isFetching ? (
          <div>로딩중</div>
        ) : datas?.length === 0 ? (
          <div>데이터가 없습니다.</div>
        ) : (
          paginatedData.map((data, index) => (
            <Item data={data} key={data.id} order={index + 1} view={view} />
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

export default AllPostList;

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
        className={styles.allPostItem}
        onClick={() => {
          setIsPlogginShowOpen(true);
        }}
      >
        <div>{data.title}</div>
        <div>{handleCreatedDate(data.createdAt)}</div>
      </div>
    </>
  );
};

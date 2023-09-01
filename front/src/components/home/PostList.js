import styles from './index.module.scss';
import React, { useEffect, useState } from 'react';
import * as Api from '../../api';
import { useSelector } from 'react-redux';
import { handlePagenation } from '../../utils/pagenation';
import Pagination from '../common/Pagenation';
import PloggingShow from '../common/PlogginShow';
import { handleCreatedDate } from '../../utils/handleCreatedDate';

const PostList = ({ view }) => {
  const [isFetching, setIsFetching] = useState(false);
  const [datas, setDatas] = useState([]);

  const user = useSelector((state) => state.user);

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
        const res = await Api.get(`/user/cert/list`);

        setDatas(res.data);
      } catch (err) {
        console.log(
          '나의 인증글 데이터를 불러오는데 실패.',
          err.response.data.message,
        );
      } finally {
        setIsFetching(false);
      }
    };

    getData();
  }, [view, user]);

  return (
    <div className="gContainer  gList navVh">
      <div className="titleContainer">
        <h1>나의 인증글보기</h1>
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

export default PostList;

/*
[{"id":13,"writerId":5,"title":"ㅇㄹㅁㅇ","region":"gangbuk","location":"124","distance":"424","trashAmount":"424","averagePace":"424","description":"424","startTime":"15","endTime":"456","createdAt":"2023-08-27T18:17:03.480Z","isGroupPost":false,"groupName":null},
*/
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

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Api from '../../api';
import styles from './index.module.scss';
import Pagination from '../common/Pagenation';
import { handlePagenation } from '../../utils/pagenation';
import MyLanking from '../feat/Lanking';
import { useSelector } from 'react-redux';
const All = ({ view }) => {
  const [isFetching, setIsFetching] = useState(false);
  const [datas, setDatas] = useState([]);
  const [isMyRankingOpen, setIsMyRankingOpen] = useState(false);
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const user = useSelector((state) => state.user);
  const paginatedData = handlePagenation(datas, currentPage, itemsPerPage);

  const handlePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        setIsFetching(true);
        const res = await Api.get(
          `/plo/hundred?limit=${itemsPerPage}&page=${currentPage}`,
        );
        setDatas(res.data.users);
        setTotalPages(res.data.totalPages);
      } catch (err) {
        console.log(
          '100명 순위데이터를 불러오는데 실패.',
          err.response.data.message,
        );
      } finally {
        setIsFetching(false);
      }
    };

    getData();
  }, [view, currentPage]);

  return (
    <div className="gContainer  gList navVh">
      {isMyRankingOpen && (
        <MyLanking
          setIsMyRankingOpen={setIsMyRankingOpen}
          name="나"
          id={user.loginId}
        />
      )}
      <div className="titleContainer">
        <h1>Top 100</h1>
        <button
          className="gBtn"
          onClick={() => {
            setIsMyRankingOpen(true);
          }}
        >
          나의 랭킹
        </button>
      </div>
      <div className={styles.ranking}>
        {isFetching ? (
          <div>로딩중</div>
        ) : datas?.length === 0 ? (
          <div>데이터가 없습니다.</div>
        ) : (
          datas.map((data) => <Item data={data} key={data.id} view={view} />)
        )}
      </div>
      <div>
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          handlePage={handlePage}
        />
      </div>
    </div>
  );
};

export default All;

/*
    {
        "id": 5,
        "nickname": "124",
        "activity": "seodaemun",
        "score": 2800,
        "rank": 1,
        "postCount": 8
    },
*/

const Item = ({ data, view }) => {
  const navigator = useNavigate();

  return (
    <div
      className={
        data.rank <= 3
          ? `${styles.rankingItem} ${styles.rankingTop3}`
          : styles.rankingItem
      }
      onClick={() => {
        navigator(`/users/${data.id}`);
      }}
    >
      <div>{data.rank}위</div>
      <div>{data.nickname}</div>
      <div>{data.score}점</div>
      <div>{data.postCount}개 인증</div>
    </div>
  );
};

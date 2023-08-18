import React, { useState } from 'react';
import Pagination from 'react-js-pagination';

const Paging = () => {
  const [page, setPage] = useState(1);

  const handlePageChange = (page) => {
    setPage(page);
  };

  return (
    <Pagination
      // 현재 페이지의 번호
      activePage={page}
      // 각 페이지마다 표시할 아이템 개수
      itemsCountPerPage={10}
      //   전체 아이템의 총 개수
      totalItemsCount={450}
      //   페이지 번호 버튼의 개수
      pageRangeDisplayed={5}
      //   이전 페이지와 다음 페이지로 넘어가는 버튼의 모양
      prevPageText={'‹'}
      nextPageText={'›'}
      onChange={handlePageChange}
    />
  );
};

export default Paging;

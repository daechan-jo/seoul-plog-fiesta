import { useState } from 'react';
import Item from './Item';
import GroupMaking from './GroupMaking';

const ItemList = ({ datas, view, setDatas }) => {
  const [isModal, setIsModal] = useState(false);

  if (datas === null) {
    return <div>로딩중</div>;
  }

  return (
    <div className="gContainer  gList">
      {isModal && <GroupMaking setIsModal={setIsModal} setDatas={setDatas} />}
      <div className="titleContainer">
        <h1>유저리스트</h1>
        <button
          className="gBtn"
          onClick={() => {
            setIsModal(true);
          }}
        >
          모임 만들기
        </button>
      </div>
      <div className="contentListContainer">
        {datas?.length === 0 ? (
          <div>데이터가 없습니다.</div>
        ) : (
          datas.map((data) => <Item data={data} key={data.id} view={view} />)
        )}
      </div>
    </div>
  );
};

export default ItemList;

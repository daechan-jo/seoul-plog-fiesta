import { useState } from 'react';
import Paging from '../myNetwork/Pagenation';
import Item from './Item';
import GroupMaking from './GroupMaking';

const ItemList = ({ datas, view }) => {
  const [isModal, setIsModal] = useState(false);
  return (
    <div className="gContainer  gList">
      {isModal && <GroupMaking setIsModal={setIsModal} />}
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
        {datas.map((data) => (
          <Item data={data} key={data.id} view={view} />
        ))}
      </div>
      <Paging />
    </div>
  );
};

export default ItemList;

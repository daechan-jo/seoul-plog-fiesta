import Item from '../network/Item';
import Paging from './Pagenation';

const ItemList = ({ datas }) => {
  return (
    <div className="gContainer gList">
      <div className="titleContainer">
        <h1>나의 친구들</h1>
      </div>
      <div className="contentListContainer">
        {datas.map((data) => (
          <Item data={data} />
        ))}
      </div>
      <Paging />
    </div>
  );
};

export default ItemList;

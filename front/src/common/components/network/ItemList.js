import Paging from '../myNetwork/Pagenation';
import Item from './Item';

const ItemList = ({ datas, view }) => {
  return (
    <div className="gContainer  gList">
      <div className="titleContainer">
        <h1>유저리스트</h1>
      </div>
      <div className="contentListContainer">
        {datas.map((data) => (
          <Item data={data} view={view} />
        ))}
      </div>
      <Paging />
    </div>
  );
};

export default ItemList;

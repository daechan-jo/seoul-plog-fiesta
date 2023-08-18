import Item from '../network/Item';
import Paging from './Pagenation';
import { BiSearchAlt2 } from 'react-icons/bi';

const ItemList = ({ datas }) => {
  return (
    <div className="gContainer gList">
      <div className="titleContainer">
        <h1>
          나의 친구들
          <BiSearchAlt2 />
        </h1>
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

import Item from '../network/Item';

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
    </div>
  );
};

export default ItemList;

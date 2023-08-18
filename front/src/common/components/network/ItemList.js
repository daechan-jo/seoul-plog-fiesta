import Item from './Item';

const ItemList = ({ datas }) => {
  return (
    <div className="gContainer  gList">
      <div className="titleContainer">
        <h1>유저리스트</h1>
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

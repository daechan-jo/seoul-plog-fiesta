import Paging from './Pagenation';
const ItemList = ({ items }) => {
  return (
    <div className="gContainer gList">
      <div className="titleContainer">
        <h1>나의 친구들</h1>
      </div>
      <div className="contentContainer">
        <div className="itemList">
          {items.map((item) => (
            <li key={item.id}>
              {item.name} - {item.region}
            </li>
          ))}
        </div>
        <Paging />
      </div>
    </div>
  );
};

export default ItemList;

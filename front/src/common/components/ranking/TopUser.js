import Item from './Item';

const TopUser = ({ datas }) => {
  return (
    <div className="gContainer">
      <div className="titleContainer">
        <h1>상위 유저</h1>
      </div>
      <div className="contentListContainer">
        {datas.map((data) => (
          <Item data={data} />
        ))}
      </div>
    </div>
  );
};

export default TopUser;

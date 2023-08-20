import Item from './Item';

const TopGroup = ({ datas }) => {
  //{ id: '1', name: '모임이름1', score: 100 },

  return (
    <div className="gContainer">
      <div className="titleContainer">
        <h1>상위 모임</h1>
      </div>
      <div className="contentListContainer">
        {datas.map((data) => (
          <Item key={data.id} data={data} />
        ))}
      </div>
    </div>
  );
};

export default TopGroup;

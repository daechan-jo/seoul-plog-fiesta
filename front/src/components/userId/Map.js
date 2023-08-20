import Map from '../common/Map';

const UserMap = () => {
  return (
    <div className="gContainer mapWidth ">
      <div className="titleContainer">
        <h1>유저이름의 플로깅 지도</h1>
      </div>
      <div className="contentMapContainer">
        <Map />
      </div>
    </div>
  );
};

export default UserMap;

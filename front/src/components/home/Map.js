import Map from '../common/Map';
import { useSelector } from 'react-redux';

const HomeMap = () => {
  const user = useSelector((state) => state.user);

  return (
    <div className="gContainer mapWidth">
      <div className="titleContainer">
        <h1>나의 플로깅 지도</h1>
      </div>
      <div className="contentMapContainer">
        <Map endpoint="/plo/count/user/" id={user.loginId} />
      </div>
    </div>
  );
};

export default HomeMap;

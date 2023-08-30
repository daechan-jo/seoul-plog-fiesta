import { useLocation } from 'react-router-dom';
import Map from '../common/Map';

const UserMap = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const id = currentPath.split('/')[2];

  return (
    <div className="gContainer mapWidth ">
      <div className="titleContainer">
        <h1>플로깅 지도</h1>
      </div>
      <div className="contentMapContainer">
        <Map endpoint="/plo/count/user/" id={id} />
      </div>
    </div>
  );
};

export default UserMap;

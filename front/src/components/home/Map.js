import React from 'react';
import Map from '../common/Map';

const HomeMap = () => {
  return (
    <div className="gContainer mapWidth">
      <div className="titleContainer">
        <h1>나의 플로깅 지도</h1>
      </div>
      <div className="contentMapContainer">
        <Map />
      </div>
    </div>
  );
};

export default React.memo(HomeMap);

import React from 'react';
import Map from '../common/Map';

const RankingMap = () => {
  return (
    <div className="gContainer mapWidth">
      <div className="titleContainer">
        <h1>플로깅 지도</h1>
      </div>
      <div className="contentMapContainer">
        <Map endpoint="/plo/count/all" id="" />
      </div>
    </div>
  );
};

export default React.memo(RankingMap);

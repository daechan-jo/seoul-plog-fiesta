import React from 'react';
import Map from '../common/Map';

const RankingMap = () => {
  return (
    <div className="gContainer">
      <div className="titleContainer">
        <h1>플로깅 지도</h1>
      </div>
      <div className="contentMapContainer">
        <Map />
      </div>
    </div>
  );
};

export default React.memo(RankingMap);

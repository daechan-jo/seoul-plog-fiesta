import React, { useEffect, useState } from 'react';
import Map from '../common/Map';

const HomeMap = () => {
  return (
    <div className="gContainer mapWidth">
      <div className="titleContainer">
        <h1>나의 플로깅 지도</h1>
      </div>
      <div className="contentMapContainer">
        <Map endpoint="params" />
      </div>
    </div>
  );
};

export default HomeMap;

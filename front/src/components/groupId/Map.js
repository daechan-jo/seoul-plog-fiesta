import React, { useContext } from 'react';
import Map from '../common/Map';
import { GroupIdContext } from '../../containers/groupId';

const GroupMap = () => {
  const name = useContext(GroupIdContext);

  return (
    <div className="gContainer mapWidth">
      <div className="titleContainer">
        <h1>모임이름 플로깅 지도</h1>
      </div>
      <div className="contentMapContainer">
        <Map endpoint="/plo/count/group/" id={name} />
      </div>
    </div>
  );
};

export default GroupMap;

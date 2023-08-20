import { useEffect, useState } from 'react';
import * as Api from '../../api';
import Map from '../../components/common/Map';
import GroupUsers from '../../components/groupId/Users';
import GroupPosts from '../../components/groupId/Posts';
import GroupMap from '../../components/groupId/Map';
import PageNav from '../../components/common/PageNav';

const GroupIdContainer = ({ id }) => {
  const lists = ['main', 'notice', 'posts', 'members'];

  return (
    <main>
      <PageNav lists={lists} />
      <div className="threeContainer">
        <GroupMap />
        <div className="box">
          <GroupUsers />
          <GroupPosts />
        </div>
      </div>
    </main>
  );
};

export default GroupIdContainer;

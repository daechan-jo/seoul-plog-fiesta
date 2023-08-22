import { useEffect, useState } from 'react';
import * as Api from '../../api';
import PageNav from '../../components/common/PageNav';
import Info from '../../components/userId/Info';
import UserMap from '../../components/userId/Map';

const UserIdContainer = ({ id }) => {
  return (
    <main>
      <div className="threeContainer fullVh">
        <UserMap />
        <Info />
      </div>
    </main>
  );
};

export default UserIdContainer;

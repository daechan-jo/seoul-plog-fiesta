import { useEffect, useState } from 'react';
import Map from '../../components/home/Map';
import MyGroup from '../../components/home/MyGroup';
import MyUser from '../../components/home/MyUser';
import * as Api from '../../api';
import PageNav from '../../components/common/PageNav';
import { useLocation } from 'react-router-dom';
import ItemList from '../../components/home/PostList';
import MessageList from '../../components/home/MessageList';

const HomeContainer = () => {
  const lists = {
    main: '홈',
    myposts: '나의 인증글',
  };

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const [view, setView] = useState(searchParams.get('view'));
  return (
    <main>
      <PageNav view={view} setView={setView} lists={lists} params={''} />
      {!view || view === 'main' ? (
        <div className="threeContainer fullVh">
          <Map />
          <div className="box">
            <MyGroup />
            <MyUser />
          </div>
        </div>
      ) : view === 'myposts' ? (
        <ItemList />
      ) : (
        <MessageList />
      )}
    </main>
  );
};

export default HomeContainer;

import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import PageNav from '../../components/common/PageNav';
import ItemList from '../../components/network';

const MyNetworkContainer = () => {
  //현재 페이지의 Nav 정적값을 결정함
  const lists = { group: 'GROUP', user: 'USER' };
  //Nav 값에 따른 view를 설정함

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const [view, setView] = useState(searchParams.get('view'));

  return (
    <main>
      <PageNav view={view} setView={setView} lists={lists} params={'network'} />
      <ItemList />
    </main>
  );
};

export default MyNetworkContainer;

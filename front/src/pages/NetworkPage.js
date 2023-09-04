import { useEffect, useState } from 'react';
import Layout from './Layout';
import { useLocation, useNavigate } from 'react-router-dom';
import useIsLogin from '../hooks/useIsLogin';
import PageNav from '../components/common/PageNav';
import ItemList from '../components/network';

const NetworkPage = () => {

  const lists = { group: 'GROUP', user: 'USER' };

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const [view, setView] = useState(searchParams.get('view'));

  useIsLogin();

  return (
    <Layout>
      <main>
      <PageNav view={view} setView={setView} lists={lists} params={'network'} />
      <ItemList />
    </main>
    </Layout>
  );
};

export default NetworkPage;

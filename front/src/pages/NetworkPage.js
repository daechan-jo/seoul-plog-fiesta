import { useEffect } from 'react';
import NetworkContainer from '../containers/network';
import Layout from './Layout';
import { useNavigate } from 'react-router-dom';
import useIsLogin from '../hooks/useIsLogin';

const NetworkPage = () => {
  useIsLogin();

  return (
    <Layout>
      <NetworkContainer />
    </Layout>
  );
};

export default NetworkPage;

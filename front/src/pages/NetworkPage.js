import { useEffect } from 'react';
import NetworkContainer from '../containers/network';
import Layout from './Layout';
import { useNavigate } from 'react-router-dom';

const NetworkPage = () => {
  return (
    <Layout>
      <NetworkContainer />
    </Layout>
  );
};

export default NetworkPage;

import { useEffect } from 'react';
import NetworkContainer from '../common/containers/network';
import Layout from './Layout';
import { useNavigate } from 'react-router-dom';

const NetworkPage = () => {
  const navigator = useNavigate();
  useEffect(() => {
    navigator('/network?view=groups');
  }, [navigator]);
  return (
    <Layout>
      <NetworkContainer />
    </Layout>
  );
};

export default NetworkPage;

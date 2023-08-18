import { useEffect } from 'react';
import NetworkContainer from '../common/containers/network';
import Layout from './Layout';
import { useNavigate } from 'react-router-dom';

const NetworkPage = () => {
  const navigaor = useNavigate();
  useEffect(() => {
    navigaor('/network?view=groups');
  }, [navigaor]);
  return (
    <Layout>
      <NetworkContainer />
    </Layout>
  );
};

export default NetworkPage;

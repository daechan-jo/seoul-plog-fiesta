import { useEffect } from 'react';
import MyNetworkContainer from '../common/containers/myNetwork';
import Layout from './Layout';
import { useNavigate } from 'react-router-dom';

const MyNetworkPage = () => {
  const navigaor = useNavigate();
  useEffect(() => {
    navigaor('/mynetwork?view=groups');
  }, [navigaor]);
  return (
    <Layout>
      <MyNetworkContainer />
    </Layout>
  );
};

export default MyNetworkPage;

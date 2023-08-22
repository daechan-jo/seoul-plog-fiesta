import RankingContainer from '../containers/ranking';
import useIsLogin from '../hooks/useIsLogin';
import Layout from './Layout';

const RankingPage = () => {
  useIsLogin();

  return (
    <Layout>
      <RankingContainer />
    </Layout>
  );
};

export default RankingPage;

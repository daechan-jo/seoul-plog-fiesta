import RecommendContainer from '../containers/recommend';
import useIsLogin from '../hooks/useIsLogin';
import Layout from './Layout';

const RecommendPage = () => {
  useIsLogin();

  return (
    <Layout>
      <RecommendContainer />
    </Layout>
  );
};

export default RecommendPage;

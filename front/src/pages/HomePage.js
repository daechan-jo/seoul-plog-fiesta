import HomeContainer from '../containers/home';
import Layout from './Layout';
import useIsLogin from '../hooks/useIsLogin';

const HomePage = () => {
  useIsLogin();

  return (
    <Layout>
      <HomeContainer />
    </Layout>
  );
};

export default HomePage;

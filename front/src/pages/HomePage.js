import { useNavigate } from 'react-router-dom';
import HomeContainer from '../containers/home';
import Layout from './Layout';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import useIsLogin from '../hooks/useIsLogin';

const HomePage = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  useIsLogin();

  return (
    <Layout>
      <HomeContainer />
    </Layout>
  );
};

export default HomePage;

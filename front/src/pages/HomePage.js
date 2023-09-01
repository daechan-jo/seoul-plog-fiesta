import HomeContainer from '../containers/home';
import Layout from './Layout';
import useIsLogin from '../hooks/useIsLogin';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const HomePage = () => {
  useIsLogin();

  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const pwToken = searchParams.get('token');
  const email = searchParams.get('email');

  useEffect(() => {
    if (pwToken) {
      navigate(`/changepassword?email=${email}&token=${pwToken}`);
    }
  }, [navigate, pwToken, email]);

  return (
    <Layout>
      <HomeContainer />
    </Layout>
  );
};

export default HomePage;

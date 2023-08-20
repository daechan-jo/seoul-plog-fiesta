import { useNavigate } from 'react-router-dom';
import HomeContainer from '../containers/home';
import Layout from './Layout';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const HomePage = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  /*
  // 로그인 상태가 아니면 로그인페이지로 이동시킴
  useEffect(() => {
    if (!user.email) {
      navigate('/login');
    }
  });

  */

  return (
    <Layout>
      <HomeContainer />
    </Layout>
  );
};

export default HomePage;

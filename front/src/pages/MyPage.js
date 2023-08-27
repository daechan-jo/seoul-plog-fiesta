import { useEffect } from 'react';
import MyContainer from '../containers/my';
import Layout from './Layout';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useIsLogin from '../hooks/useIsLogin';

const MyPage = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  useIsLogin();

  return (
    <Layout>
      <MyContainer />
    </Layout>
  );
};

export default MyPage;

import { useSelector } from 'react-redux';
import { LoginContainer } from '../common/containers/user';
import Layout from './Layout';
import { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigator = useNavigate();
  const user = useSelector((state) => state.user);

  // user의 상태가 존재하면 홈 페이지로 이동시킴
  useEffect(() => {
    if (user.email) {
      navigator('/');
    }
  });

  return (
    <Layout>
      <LoginContainer />
    </Layout>
  );
};

export default LoginPage;

import { useEffect } from 'react';
import Layout from './Layout';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PasswordEmailSuccessContainer from '../containers/password/EmailSuccess';

const PasswordEmailSuccessPage = () => {
  const navigator = useNavigate();
  const user = useSelector((state) => state.user);
  const token = sessionStorage.getItem('userToken');

  // user의 상태가 존재하면 홈 페이지로 이동시킴
  useEffect(() => {
    if (token && !user.email === '') {
      navigator('/');
    }
  }, [navigator, user, token]);

  return (
    <Layout>
      <PasswordEmailSuccessContainer />
    </Layout>
  );
};

export default PasswordEmailSuccessPage;

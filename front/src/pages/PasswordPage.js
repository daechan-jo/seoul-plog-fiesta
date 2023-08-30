import { useEffect } from 'react';
import PasswordContainer from '../containers/password';
import Layout from './Layout';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const PasswordPage = () => {
  const navigator = useNavigate();
  const user = useSelector((state) => state.user);
  const token = localStorage.getItem('userToken');

  // user의 상태가 존재하면 홈 페이지로 이동시킴
  useEffect(() => {
    if (token && !user.email === '') {
      navigator('/');
    }
  });

  return (
    <Layout>
      <PasswordContainer />
    </Layout>
  );
};

export default PasswordPage;

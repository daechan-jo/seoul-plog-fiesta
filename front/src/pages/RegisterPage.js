import { useSelector } from 'react-redux';
import { RegisterContainer } from '../containers/user';
import Layout from './Layout';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RegistePage = () => {
  const navigator = useNavigate();
  const user = useSelector((state) => state.user);
  const token = sessionStorage.getItem('userToken');
  // user의 상태가 존재하면 홈 페이지로 이동시킴
  useEffect(() => {
    if (token) {
      navigator('/');
    }
  });

  return (
    <Layout>
      <RegisterContainer />
    </Layout>
  );
};

export default RegistePage;

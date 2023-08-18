import { useEffect } from 'react';
import MyContainer from '../common/containers/my';
import Layout from './Layout';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const MyPage = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  // 로그인 상태가 아니면 로그인 페이지로 이동시킴
  useEffect(() => {
    if (!user.email) {
      navigate('/login');
    }
  });

  return (
    <Layout>
      <MyContainer />
    </Layout>
  );
};

export default MyPage;

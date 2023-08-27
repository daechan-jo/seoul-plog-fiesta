import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Layout from './Layout';

const NotFoundPage = () => {
  const navigator = useNavigate();
  const user = useSelector((state) => state.user);
  const token = sessionStorage.getItem('userToken');

  // user의 상태가 존재하면 홈 페이지로 이동시킴
  useEffect(() => {
    if (token && !user.email === '') {
      navigator('/');
    }
  });

  return (
    <Layout>
      <main>
        <h1>Not Found</h1>
      </main>
    </Layout>
  );
};

export default NotFoundPage;

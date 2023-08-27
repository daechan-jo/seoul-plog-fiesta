import { useNavigate, useParams } from 'react-router-dom';
import Layout from './Layout';
import UserIdContainer from '../containers/userId';
import useIsLogin from '../hooks/useIsLogin';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const UserIdPage = () => {
  const { userId } = useParams();
  const user = useSelector((state) => state.user);
  const navigator = useNavigate();

  useIsLogin();

  useEffect(() => {
    if (parseInt(userId) === user.loginId) {
      navigator('/mypage');
    }
  }, [navigator, user, userId]);
  return (
    <Layout>
      <UserIdContainer id={userId} />
    </Layout>
  );
};

export default UserIdPage;

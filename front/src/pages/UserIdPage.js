import { useParams } from 'react-router-dom';
import Layout from './Layout';
import UserIdContainer from '../containers/userId';
import useIsLogin from '../hooks/useIsLogin';

const UserIdPage = () => {
  const { userId } = useParams();

  useIsLogin();

  return (
    <Layout>
      <UserIdContainer id={userId} />
    </Layout>
  );
};

export default UserIdPage;

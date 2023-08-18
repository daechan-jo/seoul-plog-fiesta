import { useParams } from 'react-router-dom';
import Layout from './Layout';

const UserIdPage = () => {
  const { userId } = useParams();
  return (
    <Layout>
      <div>유저의 개인페이지</div>
      <div>{userId}</div>
    </Layout>
  );
};

export default UserIdPage;

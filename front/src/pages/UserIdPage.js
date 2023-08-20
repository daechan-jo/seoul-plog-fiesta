import { useParams } from 'react-router-dom';
import Layout from './Layout';
import UserIdContainer from '../containers/userId';

const UserIdPage = () => {
  const { userId } = useParams();

  return (
    <Layout>
      <UserIdContainer id={userId} />
    </Layout>
  );
};

export default UserIdPage;

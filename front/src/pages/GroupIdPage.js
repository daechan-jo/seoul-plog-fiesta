import { useParams } from 'react-router-dom';
import Layout from './Layout';

const GroupIdPage = () => {
  const params = useParams();

  return (
    <Layout>
      <div>유저의 개인페이지</div>
      <div>{params.groupId}</div>
    </Layout>
  );
};

export default GroupIdPage;

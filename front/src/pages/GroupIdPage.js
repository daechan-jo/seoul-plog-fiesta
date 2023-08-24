import Layout from './Layout';
import GroupIdContainer from '../containers/groupId';
import useIsLogin from '../hooks/useIsLogin';

const GroupIdPage = () => {
  useIsLogin();

  return (
    <Layout>
      <GroupIdContainer />
    </Layout>
  );
};

export default GroupIdPage;

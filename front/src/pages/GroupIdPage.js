import { useParams } from 'react-router-dom';
import Layout from './Layout';
import GroupIdContainer from '../containers/groupId';
import { useContext } from 'react';
import useIsLogin from '../hooks/useIsLogin';
import { GroupIdContext, GroupIdProvider } from '../context/groupIdContext';

const GroupIdPage = () => {
  useIsLogin();

  return (
    <GroupIdProvider>
      <Layout>
        <GroupIdContainer />
      </Layout>
    </GroupIdProvider>
  );
};

export default GroupIdPage;

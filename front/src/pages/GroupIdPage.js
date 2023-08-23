import { useParams } from 'react-router-dom';
import Layout from './Layout';
import GroupIdContainer from '../containers/groupId';
import { useContext } from 'react';
import useIsLogin from '../hooks/useIsLogin';
import { GroupIdContext, GroupIdProvider } from '../context/groupIdContext';

const GroupIdPage = () => {
  const { groupId } = useParams();

  const { setGroupId } = useContext(GroupIdContext);

  setGroupId(groupId);

  useIsLogin();

  return (
    <GroupIdProvider>
      <Layout>
        <GroupIdContainer id={groupId} />
      </Layout>
    </GroupIdProvider>
  );
};

export default GroupIdPage;

import { useParams } from 'react-router-dom';
import Layout from './Layout';
import GroupIdContainer from '../containers/groupId';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import useIsLogin from '../hooks/useIsLogin';

const GroupIdPage = () => {
  const { groupId } = useParams();

  useIsLogin();

  return (
    <Layout>
      <GroupIdContainer id={groupId} />
    </Layout>
  );
};

export default GroupIdPage;

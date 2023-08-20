import { useEffect } from 'react';
import MyNetworkContainer from '../common/containers/myNetwork';
import Layout from './Layout';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const MyNetworkPage = () => {
  const navigator = useNavigate();
  useEffect(() => {
    navigator('/mynetwork?view=groups');
  }, [navigator]);

  const user = useSelector((state) => state.user);
  /*
  // 로그인 상태가 아니면 로그인 페이지로 이동시킴
  useEffect(() => {
    if (!user.email) {
      navigator('/login');
    }
  });
  */
  return (
    <Layout>
      <MyNetworkContainer />
    </Layout>
  );
};

export default MyNetworkPage;

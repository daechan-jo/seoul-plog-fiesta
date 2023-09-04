import Layout from './Layout';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useIsLogin from '../hooks/useIsLogin';
import { useRecoilState } from 'recoil';
import RequestList from '../components/my/RequestList';
import MyInfo from '../components/my/MyInfo';
import MyGroups from '../components/my/MyGroups';
import MyUsers from '../components/my/MyUsers';
import { isRequestListOpenState } from '../features/recoilState';

const MyPage = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const [isRequestListOpen, setIsRequestListOpen] = useRecoilState(
    isRequestListOpenState,
  );

  useIsLogin();

  return (
    <Layout>
      <main>
      {isRequestListOpen && <RequestList />}
      <div className="threeContainer fullVh">
        <MyInfo />
        <div className="box">
          <MyGroups />
          <MyUsers />
        </div>
      </div>
    </main>
    </Layout>
  );
};

export default MyPage;

import MyInfo from '../../components/my/MyInfo';
import MyGroups from '../../components/my/MyGroups';
import MyUsers from '../../components/my/MyUsers';
import { isRequestListOpenState } from '../../features/recoilState';
import { useRecoilState } from 'recoil';
import RequestList from '../../components/my/RequestList';

const MyContainer = () => {
  const [isRequestListOpen, setIsRequestListOpen] = useRecoilState(
    isRequestListOpenState,
  );

  return (
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
  );
};

export default MyContainer;

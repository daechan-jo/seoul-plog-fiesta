import MyInfo from '../../components/my/MyInfo';
import MyGroups from '../../components/my/MyGroups';
import MyUsers from '../../components/my/MyUsers';

const MyContainer = () => {
  return (
    <main>
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

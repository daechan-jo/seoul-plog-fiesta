import MyInfo from '../../components/my/MyInfo';
import MyGroups from '../../components/my/MyGroups';
import MyUsers from '../../components/my/MyUsers';

const MyContainer = () => {
  return (
    <main>
      <div>
        <MyInfo />
        <div>
          <MyGroups />
          <MyUsers />
        </div>
      </div>
    </main>
  );
};

export default MyContainer;

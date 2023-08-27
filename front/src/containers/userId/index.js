import Info from '../../components/userId/Info';
import UserMap from '../../components/userId/Map';

const UserIdContainer = () => {
  return (
    <main>
      <div className="threeContainer fullVh">
        <UserMap />
        <Info />
      </div>
    </main>
  );
};

export default UserIdContainer;

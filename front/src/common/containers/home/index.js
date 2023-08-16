import Map from '../../components/home/Map';
import MyGroup from '../../components/home/MyGroup';
import MyUser from '../../components/home/MyUser';

const HomeContainer = () => {
  return (
    <main>
      <div className="threeContainer">
        <Map />
        <div className="box">
          <MyGroup />
          <MyUser />
        </div>
      </div>
    </main>
  );
};

export default HomeContainer;

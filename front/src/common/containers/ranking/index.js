import Map from '../../components/ranking/Map';
import TopGroup from '../../components/ranking/TopGroup';
import TopUser from '../../components/ranking/TopUser';

const HomeContainer = () => {
  return (
    <main>
      <div className="threeContainer">
        <Map />
        <div className="box">
          <TopGroup />
          <TopUser />
        </div>
      </div>
    </main>
  );
};

export default HomeContainer;

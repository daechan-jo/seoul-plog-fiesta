import Map from '../../components/ranking/Map';
import TopGroup from '../../components/ranking/TopGroup';
import TopUser from '../../components/ranking/TopUser';

const HomeContainer = () => {
  return (
    <main>
      <div>
        <Map />
        <div >
          <TopGroup />
          <TopUser />
        </div>
      </div>
    </main>
  );
};

export default HomeContainer;

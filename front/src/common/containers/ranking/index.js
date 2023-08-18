import Map from '../../components/ranking/Map';
import TopGroup from '../../components/ranking/TopGroup';
import TopUser from '../../components/ranking/TopUser';

const HomeContainer = () => {
  return (
    <main>
      <div className="threeContainer">
        <Map />
        <div className="box">
          <TopGroup datas={mockupGroup} />
          <TopUser datas={mockupUser} />
        </div>
      </div>
    </main>
  );
};

export default HomeContainer;

// 상위 스코어 5명을 가져옴
const mockupGroup = [
  { id: '1', name: '모임이름1', score: 100 },
  { id: '2', name: '모임이름2', score: 150 },
  { id: '3', name: '모임이름3', score: 80 },
  { id: '4', name: '모임이름4', score: 200 },
  { id: '5', name: '모임이름5', score: 120 },
];

const mockupUser = [
  { id: '1', name: '유저이름1', score: 250 },
  { id: '2', name: '유저이름2', score: 180 },
  { id: '3', name: '유저이름3', score: 300 },
  { id: '4', name: '유저이름4', score: 150 },
  { id: '5', name: '유저이름5', score: 220 },
];

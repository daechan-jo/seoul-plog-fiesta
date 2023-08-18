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

// 내 모임 및 유저의 가장 최신 글 5개를 가져옴
const mockupGroup = [
  {
    post_id: '1',
    writer_id: '작성자1',
    name: '모임이름',
    created_at: '2020-01-01',
  },
  {
    post_id: '2',
    writer_id: '작성자2',
    name: '모임이름',
    created_at: '2021-03-15',
  },
  {
    post_id: '3',
    writer_id: '작성자1',
    name: '모임이름',
    created_at: '2022-06-30',
  },
  {
    post_id: '4',
    writer_id: '작성자3',
    name: '모임이름',
    created_at: '2022-08-10',
  },
  {
    post_id: '5',
    writer_id: '작성자2',
    name: '모임이름',
    created_at: '2023-01-20',
  },
];

const mockupUser = [
  { post_id: '1', writer_id: '작성자1', created_at: '2020-01-01' },
  { post_id: '2', writer_id: '작성자2', created_at: '2021-03-15' },
  { post_id: '3', writer_id: '작성자1', created_at: '2022-06-30' },
  { post_id: '4', writer_id: '작성자3', created_at: '2022-08-10' },
  { post_id: '5', writer_id: '작성자2', created_at: '2023-01-20' },
];

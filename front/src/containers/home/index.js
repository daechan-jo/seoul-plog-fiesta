import { useEffect, useState } from 'react';
import Map from '../../components/home/Map';
import MyGroup from '../../components/home/MyGroup';
import MyUser from '../../components/home/MyUser';
import * as Api from '../../api';
import PageNav from '../../components/common/PageNav';

const HomeContainer = () => {
  const lists = ['main', 'myposts'];

  const [map, setMap] = useState(null);
  const [groups, setGroups] = useState(mockupGroup);
  const [users, setUsers] = useState(mockupUser);

  useEffect(() => {
    const getData = async () => {
      try {
        const [resMap, resGroups, resUsers] = await Promise.all([
          Api.get('/auth'),
          Api.get('/group/recent/posts'),
          Api.get('/user/recent/posts'),
        ]);
        //setMap(resMap);
        //setGroups(resGroups);
        //setUsers(resUsers);
      } catch (err) {
        console.log('데이터를 불러오는데 실패.', err);
      }
    };
    console.log('데이터가져오기');
    getData();
  }, []);

  return (
    <main>
      <PageNav lists={lists} />
      <div className="threeContainer navVh">
        <Map />
        <div className="box">
          <MyGroup datas={groups} />
          <MyUser datas={users} />
        </div>
      </div>
    </main>
  );
};

export default HomeContainer;

// 내 모임 및 유저의 가장 최신 글 5개를 가져옴 => 전체리스트를 가져와서, 5개만 뿌리고, 전체리스트 뷰
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

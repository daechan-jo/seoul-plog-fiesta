import { useEffect, useState } from 'react';
import Map from '../../components/ranking/Map';
import TopGroup from '../../components/ranking/TopGroup';
import TopUser from '../../components/ranking/TopUser';
import * as Api from '../../api';

const RankingContainer = () => {
  const [map, setMap] = useState();
  const [topGroups, setTopGroups] = useState(mockupGroup);
  const [topUsers, setTopUsers] = useState(mockupUser);

  useEffect(() => {
    const getData = async () => {
      try {
        const [resMap, resGroups, resUsers] = await Promise.all([
          Api.get('/auth'),
          Api.get('/group/recent/posts'),
          Api.get('/user/recent/posts'),
        ]);
        //setMap(resMap);
        //setTopGroups(resGroups);
        //setTopUsers(resUsers);
      } catch (err) {
        console.log('데이터를 불러오는데 실패.', err);
      }
    };
    console.log('데이터가져오기');
    getData();
  }, []);

  return (
    <main>
      <div className="threeContainer fullVh">
        <Map />
        <div className="box">
          <TopGroup datas={topGroups} />
          <TopUser datas={topUsers} />
        </div>
      </div>
    </main>
  );
};

export default RankingContainer;

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

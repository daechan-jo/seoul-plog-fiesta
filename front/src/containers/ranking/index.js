import { useEffect, useState } from 'react';
import Map from '../../components/ranking/Map';
import TopGroup from '../../components/ranking/TopGroup';
import TopUser from '../../components/ranking/TopUser';
import * as Api from '../../api';
import { useLocation } from 'react-router-dom';
import PageNav from '../../components/common/PageNav';
import All from '../../components/ranking/All';
import AllPostList from '../../components/ranking/AllPostList';

const RankingContainer = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [users, setUsers] = useState([]);
  const [groups, setGroups] = useState([]);

  const lists = { main: '홈', all: 'TOP 100', allpost: '모든 인증글' };

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const [view, setView] = useState(searchParams.get('view'));

  useEffect(() => {
    const getDatas = async () => {
      setIsFetching(true);
      try {
        await Api.get('/plo/five').then((res) => {
          setUsers(res.data.topUsers);
          setGroups(res.data.topGroups);
        });
      } catch (err) {
        console.log(
          '상위 유저 및 그룹 데이터를 불러오는데 실패.',
          err.response.data.message,
        );
      } finally {
        setIsFetching(false);
      }
    };
    getDatas();
  }, []);

  return (
    <main>
      <PageNav view={view} setView={setView} lists={lists} params={'ranking'} />
      {!view || view === 'main' ? (
        <div className="threeContainer fullVh">
          <Map />
          <div className="box">
            <TopUser datas={users} isFetching={isFetching} />
            <TopGroup datas={groups} isFetching={isFetching} />
          </div>
        </div>
      ) : view === 'all' ? (
        <All />
      ) : (
        <AllPostList />
      )}
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

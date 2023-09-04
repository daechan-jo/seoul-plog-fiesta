import { useEffect, useState } from 'react';
import PageNav from '../components/common/PageNav';
import All from '../components/ranking/All';
import AllPostList from '../components/ranking/AllPostList';
import TopGroup from '../components/ranking/TopGroup';
import TopUser from '../components/ranking/TopUser';
import useIsLogin from '../hooks/useIsLogin';
import Layout from './Layout';
import { useLocation } from 'react-router-dom';
import * as Api from '../api';
import Map from '../components/ranking/Map';

const RankingPage = () => {
  useIsLogin();

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
    <Layout>
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
    </Layout>
  );
};

export default RankingPage;

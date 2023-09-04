import { useNavigate, useParams } from 'react-router-dom';
import Layout from './Layout';
import useIsLogin from '../hooks/useIsLogin';
import { useSelector } from 'react-redux';
import { createContext, useEffect, useState } from 'react';
import * as Api from '../api';
import Info from '../components/userId/Info'
import UserMap from '../components/userId/Map'

export const UserIdContext = createContext();

const UserIdPage = () => {
  const { userId } = useParams();
  const user = useSelector((state) => state.user);
  const navigator = useNavigate();

  useIsLogin();

  const [isFetching, setIsFetching] = useState(false);
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        setIsFetching(true);
        const res = await Api.get(`/friends`);
        setFriends(res.data.friendsList.map((user) => user.id));
      } catch (err) {
        console.log(
          '그룹이름 데이터를 불러오는데 실패.',
          err.response.data.message,
        );
      } finally {
        setIsFetching(false);
      }
    };

    getData();
  }, []);

  useEffect(() => {
    if (parseInt(userId) === user.loginId) {
      navigator('/mypage');
    }
  }, [navigator, user, userId]);

  return (
    <Layout>
      <UserIdContext.Provider value={{ friends }}>
      <main>
        <div className="threeContainer fullVh">
          <Info />
          <UserMap />
        </div>
      </main>
    </UserIdContext.Provider>
    </Layout>
  );
};

export default UserIdPage;

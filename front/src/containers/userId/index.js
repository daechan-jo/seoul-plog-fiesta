import { createContext, useEffect, useState } from 'react';
import Info from '../../components/userId/Info';
import UserMap from '../../components/userId/Map';
import * as Api from '../../api';
import { useSelector } from 'react-redux';

export const UserIdContext = createContext();

const UserIdContainer = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        setIsFetching(true);
        const res = await Api.get(`/friends`);
        setFriends(res.data.friendsList.map((user) => user.id));
      } catch (err) {
        console.log('그룹이름 데이터를 불러오는데 실패.', err);
      } finally {
        setIsFetching(false);
      }
    };

    getData();
  }, []);

  return (
    <UserIdContext.Provider value={{ friends }}>
      <main>
        <div className="threeContainer fullVh">
          <Info />
          <UserMap />
        </div>
      </main>
    </UserIdContext.Provider>
  );
};

export default UserIdContainer;

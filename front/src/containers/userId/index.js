import { useEffect, useState } from 'react';
import * as Api from '../../api';
import PageNav from '../../components/common/PageNav';
import Info from '../../components/userId/Info';
import UserMap from '../../components/userId/Map';

const UserIdContainer = ({ id }) => {
  const lists = ['main', 'posts'];

  const [info, setInfo] = useState(mockmyInfo);
  const [posts, setPosts] = useState();
  const [users, setUsers] = useState();

  const [view, setView] = useState('main');

  useEffect(() => {
    const getData = async () => {
      try {
        const [resInfo, resPosts, resUsers] = await Promise.all([
          Api.get('/auth'),
          Api.get('/group/recent/posts'),
          Api.get('/user/recent/posts'),
        ]);
        //setInfo(resInfo);
        //setPosts(resPosts);
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
      <div className="threeContainer">
        <UserMap />
        <Info data={info} />
      </div>
    </main>
  );
};

export default UserIdContainer;

const mockmyInfo = {
  imgUrl: 'http://placekitten.com/200/200',
  name: '이름',
  nickname: '별명',
  email: 'dlapdlf@nave.rcom',
  password: '12345',
  about: '소개입니다. 조금 길면서 한줄입니다.',
  authCount: '인증카운터',
};

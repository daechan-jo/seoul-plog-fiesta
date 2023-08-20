import { useEffect, useState } from 'react';
import * as Api from '../../api';
import Map from '../../components/common/Map';
import GroupUsers from '../../components/groupId/Users';
import GroupPosts from '../../components/groupId/Posts';
import GroupMap from '../../components/groupId/Map';
import PageNav from '../../components/common/PageNav';

const GroupIdContainer = ({ id }) => {
  const lists = ['main', 'notice', 'posts', 'members'];

  const [map, setMap] = useState(null);
  const [posts, setPosts] = useState();
  const [users, setUsers] = useState();

  const [view, setView] = useState('main');

  useEffect(() => {
    const getData = async () => {
      try {
        const resMap = await Api.get('/auth');
        const resPosts = await Api.get('/group/mygroup');
        const resUsers = await Api.get('/user/recent/posts');
        //setMap(resMap);
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
        <GroupMap />
        <div className="box">
          <GroupUsers />
          <GroupPosts datas={users} />
        </div>
      </div>
    </main>
  );
};

export default GroupIdContainer;

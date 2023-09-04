import Layout from './Layout';
import useIsLogin from '../hooks/useIsLogin';
import GroupMember from '../components/groupId/Member';
import GroupPlogging from '../components/groupId/Plogging';
import GroupMap from '../components/groupId/Map';
import GroupRequestList from '../components/groupId/GroupRequest';
import PageNav from '../components/common/PageNav';
import { useSelector } from 'react-redux';
import { createContext, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { useLocation, useParams } from 'react-router-dom';
import { isGroupRequestListOpenState } from '../features/recoilState';
import * as Api from '../api';
import GroupUsers from '../components/groupId/Users';
import GroupPosts from '../components/groupId/Posts';
import Notice from '../components/groupId/Notice';

export const GroupIdContext = createContext();

const GroupIdPage = () => {

  const lists = {
    main: '홈',
    notice: '그룹게시판',
    posts: '인증글',
    members: '멤버보기',
  };

  const [isGroupRequestListOpen, setIsGroupRequestListOpen] = useRecoilState(
    isGroupRequestListOpenState,
  );

  const [isFetching, setIsFetching] = useState(false);

  const { groupId } = useParams();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const [view, setView] = useState(searchParams.get('view'));

  const [name, setName] = useState();
  const [members, setMembers] = useState([]);

  const user = useSelector((state) => state.user);
  const isMember = members.includes(user.loginId);

  useEffect(() => {
    const getData = async () => {
      try {
        setIsFetching(true);
        const res = await Api.get(`/group/${groupId}`);
        setName(res.data.name);
        setMembers(res.data.groupUser.map((user) => user.userId));
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
  }, [groupId]);


  useIsLogin();

  return (
    <Layout>
       <GroupIdContext.Provider value={{ name, isMember }}>
      <main>
        {isGroupRequestListOpen && <GroupRequestList />}
        <PageNav
          view={view}
          setView={setView}
          lists={lists}
          params={`groups/${groupId}`}
        />
        {view === 'main' ? (
          <div className="threeContainer navVh">
            <GroupMap />
            <div className="box">
              <GroupUsers />
              <GroupPosts setView={setView} />
            </div>
          </div>
        ) : view === 'notice' ? (
          <Notice />
        ) : view === 'posts' ? (
          <GroupPlogging />
        ) : (
          <GroupMember setView={setView} />
        )}
      </main>
    </GroupIdContext.Provider>
    </Layout>
  );
};

export default GroupIdPage;

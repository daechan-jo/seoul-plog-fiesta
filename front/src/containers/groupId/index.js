import { useContext, useState } from 'react';
import GroupUsers from '../../components/groupId/Users';
import GroupPosts from '../../components/groupId/Posts';
import GroupMap from '../../components/groupId/Map';
import PageNav from '../../components/common/PageNav';
import { useLocation, useParams } from 'react-router-dom';
import Notice from '../../components/groupId/Notice';
import GroupPlogging from '../../components/groupId/Plogging';
import GroupMember from '../../components/groupId/Member';
import { GroupIdContext, GroupIdProvider } from '../../context/groupIdContext';

const GroupIdContainer = () => {
  const lists = {
    main: '홈',
    notice: '그룹게시판',
    posts: '인증글',
    members: '멤버보기',
  };

  const { groupId } = useParams();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const [view, setView] = useState(searchParams.get('view'));

  return (
    <GroupIdProvider>
      <main>
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
              <GroupPosts />
            </div>
          </div>
        ) : view === 'notice' ? (
          <Notice />
        ) : view === 'posts' ? (
          <GroupPlogging />
        ) : (
          <GroupMember />
        )}
      </main>
    </GroupIdProvider>
  );
};

export default GroupIdContainer;

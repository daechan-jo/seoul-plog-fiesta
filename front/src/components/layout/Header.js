import { Link, useLocation, useNavigate } from 'react-router-dom';
import styles from './layout.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../features/user/userSlice';
import * as Api from '../../api';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRecoilState } from 'recoil';
import { isRequestListOpenState } from '../../features/recoilState';

const Header = ({ setIsWriting }) => {
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const user = useSelector((state) => state.user);
  const token = sessionStorage.getItem('userToken');

  const location = useLocation(); //location {pathname: '/groups/1', search: '?admin=4&view=main', hash: '', state: null, key: 'nsywyzak'}
  const currentPath = location.pathname;
  const searchParams = new URLSearchParams(location.search);

  const adminValue = searchParams.get('admin');
  const isGroupAdmin = adminValue == user.loginId;

  const id = currentPath.split('/')[2];

  const [visibleButton, setVisibleButton] = useState(null);

  const [isRequestListOpen, setIsRequestListOpen] = useRecoilState(
    isRequestListOpenState,
  );

  const handleJoinGroup = useCallback(async () => {
    if (user.groups)
      try {
        const res = await Api.post(`/group/join/${id}`);
        alert('가입 요청 성공');
      } catch (err) {
        alert(err.message ? err.message : '가입 요청 실패.');
      }
  }, [id, user.groups]);

  const handleSendFriendRequest = useCallback(async () => {
    try {
      await Api.post(`/req/${id}`, {
        id: id,
      });
      alert('친구 요청 성공');
    } catch (err) {
      alert(err.message ? err.message : '친구 요청 실패.');
    }
  }, [id]);

  const handleFriendRequestList = useCallback(() => {
    setIsRequestListOpen(true);
  }, [setIsRequestListOpen]);

  const handleGroupRequestList = useCallback(async () => {
    try {
      await Api.post(`/group/join`, {
        id: id,
      });
      alert('친구 요청 성공');
    } catch (err) {
      alert(err.message ? err.message : '친구 요청 실패.');
    }
  }, [id]);

  const buttons = useMemo(
    () => [
      {
        condition:
          currentPath.includes('/group/') &&
          user.groups &&
          !user.groups.includes(id),
        text: '가입 요청하기',
        onClick: handleJoinGroup,
      },
      {
        condition:
          currentPath.includes('/user/') &&
          user.users &&
          !user.users.includes(id),
        text: '친구 요청하기',
        onClick: handleSendFriendRequest,
      },
      {
        condition: currentPath === '/mypage',
        text: '친구요청목록',
        onClick: handleFriendRequestList,
      },
      {
        condition: isGroupAdmin,
        text: '가입요청목록',
        onClick: handleGroupRequestList,
      },
    ],
    [
      handleGroupRequestList,
      handleJoinGroup,
      handleSendFriendRequest,
      handleFriendRequestList,
      currentPath,
      id,
      isGroupAdmin,
      user,
    ],
  );

  useEffect(() => {
    const updatedVisibleButton = buttons.find((button) => button.condition);
    setVisibleButton(updatedVisibleButton);
  }, [currentPath, user.groups, user.users, isGroupAdmin, buttons]);

  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <div className={styles.min}>SPF;</div>
        <div className={styles.full}>
          Seoul<span>Plog</span>Fiesta
        </div>
      </div>
      <nav className={styles.navContainer}>
        {visibleButton ? (
          <button onClick={visibleButton.onClick}>{visibleButton.text}</button>
        ) : token && user.email ? (
          <button
            onClick={() => {
              setIsWriting(true);
            }}
          >
            인증하러가기
          </button>
        ) : null}
        {token && user.email ? (
          <Link to="/mypage">
            <button>마이 페이지</button>
          </Link>
        ) : (
          <Link to="/register">
            <button>회원가입</button>
          </Link>
        )}
        {token && user.email ? (
          <button
            onClick={() => {
              dispatch(logout());
              navigator('/intro');
            }}
          >
            로그아웃
          </button>
        ) : (
          <Link to="/login">
            <button>로그인</button>
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;

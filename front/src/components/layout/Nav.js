import { Link, useLocation } from 'react-router-dom';
import { BiSolidHome } from 'react-icons/bi';
import { FaUserFriends, FaAward, FaWalking } from 'react-icons/fa';
import styles from './layout.module.scss';
import { useState } from 'react';
import ChatList from '../chat/ChatList';
import { useRecoilState } from 'recoil';
import { isChatOpenState, isChatWiState } from '../../features/recoilState';
import Chat from '../chat/Chat';
import { useSelector } from 'react-redux';

const Nav = () => {
  const location = useLocation(); // 현재 URL 정보를 가져오는 hook
  const [isOpen, setIsOpen] = useState(false);

  const [isChatOpen, setIsChatOpen] = useRecoilState(isChatOpenState);
  const [, setErrorMessage] = useRecoilState(isChatWiState);

  const navItems = [
    { to: '/?view=main', icon: <BiSolidHome /> },
    { to: '/network?view=group', icon: <FaUserFriends /> },
    { to: '/ranking?view=main', icon: <FaAward /> },
    { to: '/recommend', icon: <FaWalking /> },
  ];

  const user = useSelector((state) => state.user);
  const token = localStorage.getItem('userToken');
  const isLogin = user.email && token;

  const handleNotLogin = () => {
    alert('로그인을 해주세요');
    return;
  };
  return (
    <div className={styles.LeftNav}>
      <nav className={styles.LeftNavContainer}>
        {isLogin
          ? navItems.map((item) => (
              <Link
                to={item.to}
                className={
                  location.pathname === item.to.split('?')[0]
                    ? styles.active
                    : styles.just
                }
                key={item.to}
              >
                <div className={styles.icon}>{item.icon}</div>
                <div className={styles.text}>
                  {item.to === '/?view=main'
                    ? 'home'
                    : item.to.split('?')[0].split('/')[1]}
                </div>
              </Link>
            ))
          : navItems.map((item) => (
              <div className={styles.just} onClick={handleNotLogin}>
                <div className={styles.icon}>{item.icon}</div>
                <div className={styles.text}>
                  {item.to === '/?view=main'
                    ? 'home'
                    : item.to.split('?')[0].split('/')[1]}
                </div>
              </div>
            ))}
      </nav>
      {isOpen && <ChatList />}
      {isChatOpen && <Chat />}
      {isLogin && (
        <button
          className="gBtn"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          채팅목록
        </button>
      )}
    </div>
  );
};

export default Nav;

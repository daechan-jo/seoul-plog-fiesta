import { Link, useLocation } from 'react-router-dom';
import { BiSolidHome } from 'react-icons/bi';
import { FaUserFriends, FaAward, FaWalking } from 'react-icons/fa';
import styles from './layout.module.scss';
import { useState } from 'react';
import ChatList from '../chat/ChatList';
import { useRecoilState } from 'recoil';
import { isChatOpenState, isChatWiState } from '../../features/recoilState';
import Chat from '../chat/Chat';

const Nav = () => {
  const location = useLocation(); // 현재 URL 정보를 가져오는 hook
  const [isOpen, setIsOpen] = useState(false);

  const [isChatOpen, setIsChatOpen] = useRecoilState(isChatOpenState);
  const [, setErrorMessage] = useRecoilState(isChatWiState);

  const navItems = [
    { to: '/?view=main', icon: <BiSolidHome /> },
    { to: '/network?view=group', icon: <FaUserFriends /> },
    { to: '/ranking', icon: <FaAward /> },
    { to: '/recommend', icon: <FaWalking /> },
  ];

  // 채팅방 리스트를 불러오는 프리플라이트(실제 채팅방 구현 후 주석풀예정, 작동확인)

  return (
    <div className={styles.LeftNav}>
      <nav className={styles.LeftNavContainer}>
        {navItems.map((item) => (
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
        ))}
      </nav>
      {isOpen && <ChatList />}
      {isChatOpen && <Chat />}
      <button
        className="gBtn"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        채팅목록
      </button>
    </div>
  );
};

export default Nav;

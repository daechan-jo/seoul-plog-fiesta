import { Link, useLocation } from 'react-router-dom';
import { BiSolidHome } from 'react-icons/bi';
import { FaUserFriends, FaAward, FaWalking } from 'react-icons/fa';
import styles from './layout.module.scss';
import { useEffect, useState } from 'react';
import * as Api from '../../api';
import ChatList from '../chat/ChatList';
import { useRecoilState } from 'recoil';
import { isChatOpenState, isChatWiState } from '../../features/recoilState';
import Chat from '../chat/Chat';

const Nav = () => {
  const location = useLocation(); // 현재 URL 정보를 가져오는 hook
  const [datas, setDatas] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const [isChatOpen, setIsChatOpen] = useRecoilState(isChatOpenState);
  const [, setErrorMessage] = useRecoilState(isChatWiState);

  const navItems = [
    { to: '/?view=main', icon: <BiSolidHome /> },
    { to: '/network?view=group', icon: <FaUserFriends /> },
    { to: '/ranking', icon: <FaAward /> },
    { to: '/recommend', icon: <FaWalking /> },
  ];

  useEffect(() => {
    const getData = async () => {
      try {
        setIsFetching(true);
        const res = await Api.get('/unread');
        setDatas(res.data);
        console.log(res);
      } catch (err) {
        console.log('채팅방 리스트를 불러오는데 실패.', err);
      } finally {
        setIsFetching(false);
      }
    };

    const intervalId = setInterval(() => {
      getData();
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

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
      {isOpen && (
        <ChatList isFetching={isFetching} datas={datas} setIsOpen={setIsOpen} />
      )}
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

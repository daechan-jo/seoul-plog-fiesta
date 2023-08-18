import { Link, useLocation } from 'react-router-dom';
import { BiSolidHome } from 'react-icons/bi';
import { FaUserFriends, FaAward } from 'react-icons/fa';
import { BiSolidUserPlus } from 'react-icons/bi';
import styles from './layout.module.scss';

const Nav = () => {
  const location = useLocation(); // 현재 URL 정보를 가져오는 hook

  return (
    <div className={styles.LeftNav}>
      <nav className={styles.LeftNavContainer}>
        <Link to="/" className={location.pathname === '/' ? styles.active : ''}>
          <BiSolidHome />
        </Link>
        <Link
          to="/mynetwork"
          className={location.pathname === '/mynetwork' ? styles.active : ''}
        >
          <FaUserFriends />
        </Link>
        <Link
          to="/network"
          className={location.pathname === '/network' ? styles.active : ''}
        >
          <BiSolidUserPlus />
        </Link>
        <Link
          to="/ranking"
          className={location.pathname === '/ranking' ? styles.active : ''}
        >
          <FaAward />
        </Link>
      </nav>
    </div>
  );
};

export default Nav;

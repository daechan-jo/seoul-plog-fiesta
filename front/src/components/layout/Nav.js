import { Link, useLocation } from 'react-router-dom';
import { BiSolidHome } from 'react-icons/bi';
import { FaUserFriends, FaAward, FaWalking } from 'react-icons/fa';
import styles from './layout.module.scss';

const Nav = () => {
  const location = useLocation(); // 현재 URL 정보를 가져오는 hook

  const navItems = [
    { to: '/', icon: <BiSolidHome /> },
    { to: '/network?view=group', icon: <FaUserFriends /> },
    { to: '/ranking', icon: <FaAward /> },
    { to: '/recommend', icon: <FaWalking /> },
  ];

  return (
    <div className={styles.LeftNav}>
      <nav className={styles.LeftNavContainer}>
        {navItems.map((item) => (
          <Link
            to={item.to}
            className={location.pathname === item.to ? styles.active : ''}
            key={item.to}
          >
            {item.icon}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Nav;

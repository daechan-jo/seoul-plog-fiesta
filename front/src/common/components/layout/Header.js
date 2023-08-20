import { Link } from 'react-router-dom';
import styles from './layout.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../features/user/userSlice';

const Header = ({ setIsWriting }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const handleLogoutClick = () => {
    dispatch(logout());
  };

  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <div>로고이미지</div>
        <div>logo</div>
      </div>
      <nav className={styles.navContainer}>
        <button
          onClick={() => {
            setIsWriting(true);
          }}
        >
          인증하러가기
        </button>
        <Link to="/mypage">
          <button>마이 페이지</button>
        </Link>
        {user.email ? (
          <button onClick={handleLogoutClick}>로그아웃</button>
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

import { Link } from 'react-router-dom';
import styles from './layout.module.scss';
import { useState } from 'react';
import Plogging from '../common/Plogging';

const Header = ({ setIsPosting }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <div>로고이미지</div>
        <div>logo</div>
      </div>
      <nav className={styles.navContainer}>
        <button onClick={openModal}>인증하러가기</button>
        <Plogging isOpen={isModalOpen} closeModal={closeModal} />
        <Link to="/mypage">
          <button>마이 페이지</button>
        </Link>
        <Link to="/login">
          <button>로그인</button>
        </Link>
      </nav>
    </header>
  );
};

export default Header;

import { Link } from "react-router-dom";
import styles from "./layout.module.scss";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <div>로고이미지</div>
        <div>logo</div>
      </div>
      <nav className={styles.navContainer}>
        <Link to="#">
          <button>page1</button>
        </Link>
        <Link to="#">
          <button>page2</button>
        </Link>
        <Link to="#">
          <button>page3</button>
        </Link>
        <Link to="#">
          <button>page4</button>
        </Link>
      </nav>
    </header>
  );
};

export default Header;

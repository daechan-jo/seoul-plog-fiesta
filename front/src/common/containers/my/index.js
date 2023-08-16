import MyInfo from '../../components/my/MyInfo';
import MyGroups from '../../components/my/MyGroups';
import MyUsers from '../../components/my/MyUsers';
import styles from './index.module.scss';

const MyContainer = () => {
  return (
    <main>
      <div className={styles.my}>
        <MyInfo />
        <div className={styles.myBox}>
          <MyGroups />
          <MyUsers />
        </div>
      </div>
    </main>
  );
};

export default MyContainer;

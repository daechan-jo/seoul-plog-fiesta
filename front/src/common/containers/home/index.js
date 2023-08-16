import styles from './index.module.scss';
import Map from '../../components/home/Map';
import MyGroup from '../../components/home/MyGroup';
import MyUser from '../../components/home/MyUser';

const HomeContainer = () => {
  return (
    <main>
      <div classname={styles.container}>
        <Map />
        <div classname={styles.box}>
          <MyGroup />
          <MyUser />
        </div>
      </div>
    </main>
  );
};

export default HomeContainer;

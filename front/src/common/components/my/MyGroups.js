import MyGroup from './MyGroup';
import styles from './index.module.scss';

const MyGroups = ({ datas }) => {
  return (
    <div className={`gContainer ${styles.groupContainer}`}>
      <div className="titleContainer">
        <h1>모임관리</h1>
      </div>
      <div className={styles.shortBox}>
        {datas.map((data) => (
          <MyGroup key={data.id} data={data} />
        ))}
      </div>
    </div>
  );
};

export default MyGroups;

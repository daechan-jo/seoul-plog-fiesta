import { useNavigate } from 'react-router-dom';
import styles from './index.module.scss';

const MyGroup = ({ data }) => {
  const navigator = useNavigate();
  return (
    <div
      className={styles.myGroup}
      onClick={() => {
        navigator(`/group/${data.id}`);
      }}
    >
      <div className={styles.imgContainer}>
        <img src={data.imgUrl} alt="이미지" />
      </div>
      <div>{data.name}</div>
      <div>{data.score}</div>
    </div>
  );
};

export default MyGroup;

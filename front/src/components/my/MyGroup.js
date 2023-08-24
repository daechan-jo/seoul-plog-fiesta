import { useNavigate } from 'react-router-dom';
import styles from './index.module.scss';
import user_none from '../../assets/user_none.png';

const MyGroup = ({ data }) => {
  const navigator = useNavigate();
  return (
    <div
      className={styles.myGroup}
      onClick={() => {
        navigator(
          `/groups/${data.groupId}?admin=${data.group.managerId}&view=main`,
        );
      }}
    >
      <div className={styles.imgContainer}>
        <img src={user_none} alt="이미지" />
      </div>
      <div>{data.group.name}</div>
    </div>
  );
};

export default MyGroup;

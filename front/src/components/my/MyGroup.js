import { useNavigate } from 'react-router-dom';
import styles from './index.module.scss';
import user_none from '../../assets/user_none.png';
import { handleImgUrl } from '../../utils/handleImgUrl';

const MyGroup = ({ data }) => {
  const navigator = useNavigate();
  return (
    <div
      className={styles.myGroup}
      onClick={() => {
        navigator(`/groups/${data.id}?admin=${data.managerId}&view=main`);
      }}
    >
      <div className={styles.imgContainer}>
        <img
          src={
            !data.imageUrl || data.imageUrl.length === 0
              ? user_none
              : handleImgUrl(data.imageUrl)
          }
          alt="이미지"
        />
      </div>
      <div>{data.name}</div>
    </div>
  );
};

export default MyGroup;

import { useNavigate } from 'react-router-dom';
import styles from './index.module.scss';
import user_none from '../../assets/user_none.png';
import { handleImgUrl } from '../../utils/handleImgUrl';
import * as Api from '../../api';

const MyGroup = ({ data, isEditing, setDatas }) => {
  const navigator = useNavigate();

  const handleDelete = async () => {
    const confirmDelete = window.confirm('정말로 삭제하시겠습니까?');

    if (confirmDelete) {
      try {
        await Api.get(`/group/${data.id}`);
        setDatas((datas) => datas.filter((prev) => prev.id !== data.id));
      } catch (err) {
        console.log('그룹 탈퇴 실패.', err);
      }
    } else {
      console.log('그룹 탈퇴가 취소되었습니다.');
    }
  };

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
      {isEditing && (
        <button className={styles.delete} onClick={handleDelete}>
          X
        </button>
      )}
    </div>
  );
};

export default MyGroup;

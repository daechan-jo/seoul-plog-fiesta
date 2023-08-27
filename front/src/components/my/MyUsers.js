import { useNavigate } from 'react-router-dom';
import styles from './index.module.scss';
import { useEffect, useState } from 'react';
import * as Api from '../../api';

const MyUsers = () => {
  const [datas, setDatas] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        setIsFetching(true);
        const res = await Api.get(`/friends`);
        console.log('res', res);
        if (res.data.friendsList) {
          //{"message":"친구 목록","friendsList":[{"userB":{"id":1,"nickname":"끼룩끼룩","about":null,"activity":null}}]}
          setDatas(res.data.friendsList);
        } else {
          setDatas([]);
        }
      } catch (err) {
        console.log('모임데이터를 불러오는데 실패.', err);
      } finally {
        setIsFetching(false);
      }
    };

    getData();
  }, []);

  return (
    <div className="gContainer">
      <div className="titleContainer">
        <h1>나의 친구들</h1>
        <button
          className="gBtn"
          onClick={() => {
            setIsEditing(!isEditing);
          }}
        >
          친구 관리
        </button>
      </div>
      <div className={styles.shortBox}>
        {isFetching ? (
          <div>로딩중</div>
        ) : datas.length === 0 ? (
          <div>데이터가 없습니다</div>
        ) : (
          datas.map((data) => (
            <MyUser
              isEditing={isEditing}
              key={`my_group_list_${data.id}`}
              data={data}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default MyUsers;

const MyUser = ({ data, isEditing }) => {
  const navigator = useNavigate();

  const handleDelete = async () => {
    const confirmDelete = window.confirm('정말로 삭제하시겠습니까?');

    if (confirmDelete) {
      try {
        await Api.get(`/user/drop/${data.id}`);
      } catch (err) {
        console.log('친구 삭제 실패.', err);
      }
    } else {
      console.log('친구 삭제가 취소되었습니다.');
    }
  };

  return (
    <div
      className={styles.myGroup}
      onClick={() => {
        navigator(`/users/${data.id}?view=main`);
      }}
    >
      <div className={styles.imgContainer}>
        <img src={data.imgUrl} alt="이미지" />
      </div>
      <div>{data.nickname}</div>
      {isEditing && (
        <button className={styles.delete} onClick={handleDelete}>
          X
        </button>
      )}
    </div>
  );
};

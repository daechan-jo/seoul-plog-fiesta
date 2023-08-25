import { useNavigate } from 'react-router-dom';
import styles from './index.module.scss';
import { useEffect, useState } from 'react';
import * as Api from '../../api';

const MyUsers = () => {
  const [datas, setDatas] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        setIsFetching(true);
        const res = await Api.get(`/friend`);
        console.log('res', res);
        if (res.data) {
          setDatas(res.data);
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
        <button className="gBtn">친구 관리</button>
      </div>
      <div className={styles.shortBox}>
        {isFetching ? (
          <div>로딩중</div>
        ) : datas.length === 0 ? (
          <div>데이터가 없습니다</div>
        ) : (
          datas.map((data) => (
            <MyUser key={`my_group_list_${data.id}`} data={data} />
          ))
        )}
      </div>
    </div>
  );
};

export default MyUsers;

const MyUser = ({ data }) => {
  const navigator = useNavigate();
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
      <div>{data.name}</div>
      <div>{data.score}</div>
    </div>
  );
};

import { useEffect, useState } from 'react';
import * as Api from '../../api';
import styles from './index.module.scss';
import { handleCreatedDate } from '../../utils/handleCreatedDate';

const MyUser = () => {
  const [datas, setDatas] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        setIsFetching(true);
        const res = await Api.get(`/user/list/info`);
        if (!res.data) {
          setDatas([]);
        } else {
          setDatas(res.data.friendsRecentPost);
        }
      } catch (err) {
        console.log('유저데이터를 불러오는데 실패.', err.response.data.message);
        setDatas([]);
      } finally {
        setIsFetching(false);
      }
    };

    getData();
  }, []);

  return (
    <div className="gContainer">
      <div className="titleContainer">
        <h1>나의 친구들 현황</h1>
      </div>
      <div className={styles.userList}>
        {isFetching ? (
          <div>로딩중</div>
        ) : datas.length !== 0 ? (
          datas.map((data, index) => (
            <Item key={data.id} data={data} order={index + 1} />
          ))
        ) : (
          <div>데이터가 없습니다</div>
        )}
      </div>
    </div>
  );
};

export default MyUser;

const Item = ({ data, order }) => {
  return (
    <div className={styles.userItem}>
      <div>{order}</div>
      <h2>{data.title}</h2>
      <div>{handleCreatedDate(data.createdAt)}</div>
    </div>
  );
};

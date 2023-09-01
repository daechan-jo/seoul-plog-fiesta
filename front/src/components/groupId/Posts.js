import { useEffect, useState } from 'react';
import * as Api from '../../api';
import { useParams } from 'react-router-dom';
import { handleCreatedDate } from '../../utils/handleCreatedDate';
import styles from './index.module.scss';

const GroupPosts = ({ setView }) => {
  return (
    <div className="gContainer">
      <div className="titleContainer">
        <h1>공지사항</h1>
      </div>
      <List />
    </div>
  );
};

export default GroupPosts;

const List = () => {
  const [datas, setDatas] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  const { groupId } = useParams();

  useEffect(() => {
    const getData = async () => {
      try {
        setIsFetching(true);
        const res = await Api.get(`/group/posts/${groupId}`);
        setDatas(res.data.filter((data) => data.isNotice === true));
      } catch (err) {
        console.log(
          '공지사항 데이터를 불러오는데 실패.',
          err.response.data.message,
        );
        setDatas([]);
      } finally {
        setIsFetching(false);
      }
    };

    getData();
  }, [groupId]);

  return (
    <div className="contentMinContainer">
      <div className={styles.userList}>
        {isFetching ? (
          <div>로딩중</div>
        ) : datas.length === 0 ? (
          <div>데이터가 없습니다</div>
        ) : (
          datas.map((data, index) => (
            <Item key={data.id} data={data} order={index + 1} />
          ))
        )}
      </div>
    </div>
  );
};

const Item = ({ data, order }) => {
  const date = handleCreatedDate(data.createdAt);
  return (
    <div className={styles.mainItem}>
      <div>{order}</div>
      <div>{data.title}</div>
      <div>{date}</div>
    </div>
  );
};

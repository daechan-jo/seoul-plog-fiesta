import { useContext, useEffect, useState } from 'react';
import * as Api from '../../api';
import { useNavigate, useParams } from 'react-router-dom';
import { GroupIdContext } from '../../context/groupIdContext';
import { handleCreatedDate } from '../../utils/handleCreatedDate';
import styles from './index.module.scss';

const GroupPosts = () => {
  const navigator = useNavigate();

  const { groupId } = useParams();

  return (
    <div className="gContainer">
      <div className="titleContainer">
        <h1>공지사항</h1>
        <button
          className="gBtn"
          onClick={() => {
            navigator(`/groups/${groupId}?view=notice`);
          }}
        >
          게시판 바로가기
        </button>
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
        console.log(res.data);
        setDatas(res.data);
      } catch (err) {
        console.log('공지사항 데이터를 불러오는데 실패.', err);
        setDatas([]);
      } finally {
        setIsFetching(false);
      }
    };

    getData();
  }, [groupId]);

  return (
    <div className="contentMinContainer">
      {isFetching ? (
        <div>로딩중</div>
      ) : datas.length === 0 ? (
        <div>데이터가 없습니다</div>
      ) : (
        datas
          .filter((data) => data.isNotice === true)
          .map((data) => <Item key={data.id} data={data} />)
      )}
    </div>
  );
};

const Item = ({ data }) => {
  const date = handleCreatedDate(data.createdAt);
  return (
    <div className={styles.notices}>
      <div>{data.title}</div>
      <div>{date}</div>
    </div>
  );
};

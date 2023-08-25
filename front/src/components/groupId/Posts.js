import { useContext, useEffect, useState } from 'react';
import * as Api from '../../api';
import { useNavigate, useParams } from 'react-router-dom';
import { GroupIdContext } from '../../context/groupIdContext';

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
        console.log(res);
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
    <div className="contentContainer">
      {isFetching ? (
        <div>로딩중</div>
      ) : datas.length === 0 ? (
        <div>데이터가 없습니다</div>
      ) : (
        datas.map((data) => (
          <Item key={`group_page ${data.groupId}`} data={data} />
        ))
      )}
    </div>
  );
};

const Item = ({ data }) => {
  return <div>data입니다.</div>;
};

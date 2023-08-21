import { useEffect, useState } from 'react';
import * as Api from '../../api';

const GroupPosts = () => {
  return (
    <div className="gContainer">
      <div className="titleContainer">
        <h1>공지사항</h1>
        <button className="gBtn">게시판 바로가기</button>
      </div>
      <List />
    </div>
  );
};

export default GroupPosts;

const List = () => {
  const [datas, setDatas] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        setIsFetching(true);
        const res = await Api.get('');
        //setDatas(res.data);
      } catch (err) {
        console.log('그룹공지사항데이터불러오기 실패', err);
      } finally {
        setIsFetching(false);
      }
    };

    getData();
  }, []);

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

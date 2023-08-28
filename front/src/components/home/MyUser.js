import { useEffect, useState } from 'react';
import * as Api from '../../api';

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
          setDatas(res.data);
        }
      } catch (err) {
        console.log('유저데이터를 불러오는데 실패.', err);
        setDatas([]);
      } finally {
        setIsFetching(false);
        console.log(datas);
        console.log(datas.length);
      }
    };

    getData();
  }, []);

  return (
    <div className="gContainer">
      <div className="titleContainer">
        <h1>나의 친구들 현황</h1>
      </div>
      <div className="contentMinContainer">
        {isFetching ? (
          <div>로딩중</div>
        ) : datas.length !== 0 ? (
          datas.map((data) => <Item key={`${data.id}`} data={data} />)
        ) : (
          <div>데이터가 없습니다</div>
        )}
      </div>
    </div>
  );
};

export default MyUser;

const Item = ({ data }) => {
  return (
    <div>
      <h2>{data.title}</h2>
      <div>유저 게시글 작성자</div>
    </div>
  );
};

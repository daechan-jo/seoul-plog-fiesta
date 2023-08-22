import { useNavigate } from 'react-router-dom';
import styles from './index.module.scss';
import { useEffect, useState } from 'react';
import * as Api from '../../api';

const mockupUser = [
  {
    id: '1',
    name: '유저이름1',
    imgUrl: 'http://placekitten.com/200/200',
    score: 250,
  },
  {
    id: '2',
    name: '유저이름2',
    imgUrl: 'http://placekitten.com/200/200',
    score: 180,
  },
  {
    id: '3',
    name: '유저이름3',
    imgUrl: 'http://placekitten.com/200/200',
    score: 300,
  },
  {
    id: '4',
    name: '유저이름4',
    imgUrl: 'http://placekitten.com/200/200',
    score: 150,
  },
  {
    id: '5',
    name: '유저이름5',
    imgUrl: 'http://placekitten.com/200/200',
    score: 220,
  },
  {
    id: '6',
    name: '유저이름6',
    imgUrl: 'http://placekitten.com/200/200',
    score: 170,
  },
  {
    id: '7',
    name: '유저이름7',
    imgUrl: 'http://placekitten.com/200/200',
    score: 280,
  },
  {
    id: '8',
    name: '유저이름8',
    imgUrl: 'http://placekitten.com/200/200',
    score: 200,
  },
  {
    id: '9',
    name: '유저이름9',
    imgUrl: 'http://placekitten.com/200/200',
    score: 230,
  },
  {
    id: '10',
    name: '유저이름10',
    imgUrl: 'http://placekitten.com/200/200',
    score: 210,
  },
];

const MyUsers = () => {
  const [datas, setDatas] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        setIsFetching(true);
        const res = await Api.get(`/user/friend`);
        setDatas(res.data);
      } catch (err) {
        console.log('모임데이터를 불러오는데 실패.', err);
      } finally {
        setDatas(mockupUser);
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

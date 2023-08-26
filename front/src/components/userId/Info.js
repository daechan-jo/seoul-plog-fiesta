import { useEffect, useState } from 'react';
import * as Api from '../../api';
import styles from './index.module.scss';
import { useLocation, useParams } from 'react-router-dom';

const mockmyInfo = {
  imgUrl: 'http://placekitten.com/200/200',
  name: '이름',
  nickname: '별명',
  email: 'dlapdlf@nave.rcom',
  password: '12345',
  about: '소개입니다. 조금 길면서 한줄입니다.',
  authCount: '인증카운터',
};

const Info = () => {
  const [data, setData] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  const location = useLocation();
  const currentPath = location.pathname;

  const ownerId = currentPath.split('/')[2].split('?')[0];

  useEffect(() => {
    const getData = async () => {
      try {
        setIsFetching(true);
        const res = await Api.get(`/search/${ownerId}`);
        setData(res.data);
        console.log(res);
      } catch (err) {
        console.log('상위모임데이터를 불러오는데 실패.', err);
      } finally {
        setIsFetching(false);
      }
    };

    getData();
  }, []);

  return (
    <div className={`gContainer`}>
      <div className="titleContainer">
        <h1>내 정보</h1>
      </div>
      <ul className={styles.info}>
        <div className={styles.imgContainer}>
          <img
            src={data?.imgUrl || 'http://placekitten.com/200/200'}
            alt="profile"
          />
        </div>
        <li key="myNickName">
          <label>별명</label>
          <div>{data.searchId?.nickname}</div>
        </li>
        <li key="myAbout">
          <label>소개</label>
          <div>{data.searchId?.about}</div>
        </li>
        <li key="activity">
          <label>지역구</label>
          <div>{data.searchId?.activity}</div>
        </li>
      </ul>
    </div>
  );
};

export default Info;

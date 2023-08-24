import { useEffect, useState } from 'react';
import * as Api from '../../api';
import styles from './index.module.scss';
import { useLocation, useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { isChatOpenState, isChatWiState } from '../../features/recoilState';

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

  const [isChatOpen, setIsChatOpen] = useRecoilState(isChatOpenState);
  const [, setChatId] = useRecoilState(isChatWiState);

  const handleChat = () => {
    setChatId(2);
    setIsChatOpen(!isChatOpen);
  };
  const handleClick = async () => {
    try {
      setIsFetching(true);
      const res = await Api.get(
        `/user/add/${currentPath.split('/')[2].split('?')[0]}`,
      );
      //setData(res.data);
    } catch (err) {
      console.log('친구추가 실패.', err);
    } finally {
      setIsFetching(false);
      setData(mockmyInfo);
    }
  };
  useEffect(() => {
    const getData = async () => {
      try {
        setIsFetching(true);
        const res = await Api.get(``);
        //setData(res.data);
      } catch (err) {
        console.log('상위모임데이터를 불러오는데 실패.', err);
      } finally {
        setIsFetching(false);
        setData(mockmyInfo);
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
        <li key="myEmail">
          <label>이메일</label>
          <div>{data.email}</div>
        </li>
        <li key="myName">
          <label>이름</label>
          <div>{data.name}</div>
        </li>
        <li key="myNickName">
          <label>별명</label>
          <div>{data.nickname}</div>
        </li>
        <li key="myAbout">
          <label>소개</label>
          <div>{data.about}</div>
        </li>
        <li key="activity">
          <label>지역구</label>
          <div>강동구</div>
        </li>
      </ul>
      <button className="gBtn" onClick={handleClick}>
        친구추가
      </button>
      <button className="gBtn" onClick={handleChat}>
        채팅보내기
      </button>
    </div>
  );
};

export default Info;

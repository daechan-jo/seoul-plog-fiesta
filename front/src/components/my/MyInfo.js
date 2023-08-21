import styles from './index.module.scss';
import React, { useEffect, useState } from 'react';
import user_none from '../../assets/user_none.png';
import * as Api from '../../api';

const mockmyInfo = {
  imgUrl: 'http://placekitten.com/200/200',
  name: '이름',
  nickname: '별명',
  email: 'dlapdlf@nave.rcom',
  password: '12345',
  about: '소개입니다. 조금 길면서 한줄입니다.',
  authCount: '인증카운터',
};

const MyInfo = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [data, setDatas] = useState({
    imgUrl: '',
    name: '',
    nickname: '',
    email: '',
    about: '',
    authCount: '',
    region: '',
  });

  useEffect(() => {
    const getDatas = async () => {
      setIsFetching(true);
      try {
        await Api.get('/user/recent/posts').then(setDatas(mockmyInfo));
      } catch (err) {
        console.log('데이터를 불러오는데 실패.', err);
      } finally {
        setIsFetching(false);
      }
    };
    console.log('데이터가져오기');
    getDatas();
  }, []);

  return (
    <div className={`gContainer ${styles.InfoContainer}`}>
      <div className="titleContainer">
        <h1>내 정보</h1>
      </div>
      <ul className={styles.info}>
        <div className={styles.imgContainer}>
          <img src={data.imgUrl || user_none} alt="profile" />
        </div>
        {!isEditing && (
          <>
            <li>
              <label>이메일</label>
              <div>{data.email}</div>
            </li>
            <li>
              <label>이름</label>
              <div>{data.name}</div>
            </li>
            <li>
              <label>별명</label>
              <div>{data.nickname}</div>
            </li>
            <li>
              <label>소개</label>
              <div>{data.about}</div>
            </li>
            <li>
              <label>지역구</label>
              <div>{data.region}</div>
            </li>
          </>
        )}
        {isEditing && (
          <>
            <li>
              <label>이메일</label>
              <input />
            </li>
            <li>
              <label>이름</label>
              <input />
            </li>
            <li>
              <label>별명</label>
              <input />
            </li>
            <li>
              <label>소개</label>
              <input />
            </li>
            <li>
              <label>지역구</label>
              <input />
            </li>
          </>
        )}
      </ul>
      <div>
        {isEditing ? (
          <>
            <button
              className="gBtn"
              onClick={() => {
                setIsEditing(false);
              }}
            >
              수정완료
            </button>
            <button
              className="gBtn"
              onClick={() => {
                setIsEditing(false);
              }}
            >
              수정취소
            </button>
          </>
        ) : (
          <button
            className="gBtn"
            onClick={() => {
              setIsEditing(true);
            }}
          >
            수정하기
          </button>
        )}
        <button
          className="gBtn"
          onClick={() => {
            // 초기화 버튼 동작 구현
          }}
        >
          초기화
        </button>
      </div>
    </div>
  );
};

export default React.memo(MyInfo);

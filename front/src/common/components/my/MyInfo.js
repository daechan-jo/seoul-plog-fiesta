import styles from './index.module.scss';
import { useState } from 'react';

/*
const myInfo = {
  imgUrl: 'http://placekitten.com/200/200',
  name: '이름',
  nickname: '별명',
  email: 'dlapdlf@nave.rcom',
  password: '12345',
  about: '소개입니다. 조금 길면서 한줄입니다.',
  authCount: '인증카운터',
};
*/

const MyInfo = ({ data }) => {
  const [isEditing, setIsEditing] = useState(false);
  if (!isEditing) {
    return (
      <div className={`gContainer ${styles.InfoContainer}`}>
        <div className="titleContainer">
          <h1>내 정보</h1>
        </div>
        <ul className={styles.info}>
          <div className={styles.imgContainer}>
            <img
              src={data.imgUrl || 'http://placekitten.com/200/200'}
              alt="profile"
            />
          </div>
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
            <div>강동구</div>
          </li>
        </ul>
        <div>
          <button
            className="gBtn"
            onClick={() => {
              setIsEditing(true);
            }}
          >
            수정하기
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className={`gContainer ${styles.InfoContainer}`}>
      <div className="titleContainer">
        <h1>내 정보</h1>
      </div>
      <ul className={styles.info}>
        <div className={styles.imgContainer}>
          <img src={data.imgUrl} alt="profile" />
        </div>
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
      </ul>

      <div>
        <button
          className="gBtn"
          onClick={() => {
            setIsEditing(true);
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
        <button
          className="gBtn"
          onClick={() => {
            setIsEditing(true);
          }}
        >
          초기화
        </button>
      </div>
    </div>
  );
};

export default MyInfo;

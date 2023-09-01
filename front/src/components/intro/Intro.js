import React, { useEffect, useState } from 'react';
import style from './intro.module.scss';
import { useNavigate } from 'react-router-dom';
import * as Api from '../../api';
import { handleImgUrl } from '../../utils/handleImgUrl';

const Intro = () => {
  const [datas, setDatas] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        setIsFetching(true);
        const res = await Api.get(`/plo/main/five`);
        setDatas(res.data);
      } catch (err) {
        console.log('탑5데이터를 불러오는데 실패.', err.response.data.message);
        setDatas([]);
      } finally {
        setIsFetching(false);
      }
    };

    getData();
  }, []);

  const navigate = useNavigate();
  const loginForm = () => {
    navigate('/login');
  };
  const registerForm = () => {
    navigate('/register');
  };
  const mainMove = () => {
    navigate('/');
  };
  /*
    {
      "id": 5,
      "nickname": "nickname5",
      "profileImage": null,
      "score": 2118,
      "rank": 1
      },
      */
  return (
    <div className={style.IntroContainer}>
      <div className={style.TextContainer}>
        <div className={style.title}>
          Plogging
          <span>[ plocka upp + jogging]</span>
        </div>
        <div className={style.summary}>
          조깅을 하는 동안 눈에 띄는 쓰레기를 줍는 일.
          <br />
          운동으로 건강을 챙기는 동시에 환경을 지키기 위한 작은 실천에
          동참하자는 취지로 행하는 환경보호 운동
        </div>
      </div>
      <div className={style.sideImage}>
        <div className={style.rankBox}>
          <div className={style.rankTitle}>랭킹</div>
          {isFetching ? (
            <div>로딩중</div>
          ) : (
            datas.map((data) => (
              <div key={data.id} className={style.ranks}>
                <div className={style.rankBack}>{data.rank}위</div>

                <div>{data.nickname}</div>
                <div>{data.score} 점</div>

                <div className={style.profile}>
                  <img src={handleImgUrl(data.imageUrl)} alt="프로필 이미지" />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <div className={style.ButtonContainer}>
        <button className={style.main} onClick={mainMove}>
          메인으로
        </button>
        <button className={style.login} onClick={loginForm}>
          로그인하기
        </button>
        <button className={style.register} onClick={registerForm}>
          회원가입하기
        </button>
      </div>
    </div>
  );
};

export default Intro;

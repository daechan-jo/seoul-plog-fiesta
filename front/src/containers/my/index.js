import MyInfo from '../../components/my/MyInfo';
import MyGroups from '../../components/my/MyGroups';
import MyUsers from '../../components/my/MyUsers';
import { useEffect, useState } from 'react';
import * as Api from '../../api';

const MyContainer = () => {
  const [isFetching, setIsFetching] = useState(false);

  return (
    <main>
      <div className="threeContainer fullVh">
        <MyInfo />
        <div className="box">
          <MyGroups />
          <MyUsers />
        </div>
      </div>
    </main>
  );
};

export default MyContainer;

const mockmyInfo = {
  imgUrl: 'http://placekitten.com/200/200',
  name: '이름',
  nickname: '별명',
  email: 'dlapdlf@nave.rcom',
  password: '12345',
  about: '소개입니다. 조금 길면서 한줄입니다.',
  authCount: '인증카운터',
};

//인증글 불필요, 나의 모임 및 유저의 이름 목록만 가져옴 알단 클라에서 페이지네이션 추가해야함

import MyInfo from '../../components/my/MyInfo';
import MyGroups from '../../components/my/MyGroups';
import MyUsers from '../../components/my/MyUsers';
import { useEffect, useState } from 'react';
import * as Api from '../../../api';

const MyContainer = () => {
  const [myInfo, setMyInfo] = useState(mockmyInfo);
  const [myGroups, setMyGroups] = useState(mockupGroup);
  const [myUsers, setMyUsers] = useState();

  useEffect(() => {
    const getDatas = async () => {
      try {
        const resMyInfo = await Api.get('');
        const resMyGroups = await Api.get('');
        const resMyUsers = await Api.get('');
        //setMyInfo(resMyInfo)
        //setMyGroups(resMyGroups)
        //setMyUsers(resMyUsers)
      } catch (err) {
        console.log('데이터를 불러오는데 실패.', err);
      }
    };
    console.log('데이터가져오기');
    getDatas();
  }, []);

  return (
    <main>
      <div className="threeContainer">
        <MyInfo data={myInfo} />
        <div className="box">
          <MyGroups datas={myGroups} />
          <MyUsers datas={myUsers} />
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
const mockupGroup = [
  {
    id: '1',
    name: '모임이름1',
    imgUrl: 'http://placekitten.com/200/200',
    score: 100,
  },
  {
    id: '2',
    name: '모임이름2',
    imgUrl: 'http://placekitten.com/200/200',
    score: 150,
  },
  {
    id: '3',
    name: '모임이름3',
    imgUrl: 'http://placekitten.com/200/200',
    score: 80,
  },
  {
    id: '4',
    name: '모임이름4',
    imgUrl: 'http://placekitten.com/200/200',
    score: 200,
  },
  {
    id: '5',
    name: '모임이름5',
    imgUrl: 'http://placekitten.com/200/200',
    score: 120,
  },
  {
    id: '6',
    name: '모임이름6',
    imgUrl: 'http://placekitten.com/200/200',
    score: 90,
  },
  {
    id: '7',
    name: '모임이름7',
    imgUrl: 'http://placekitten.com/200/200',
    score: 160,
  },
  {
    id: '8',
    name: '모임이름8',
    imgUrl: 'http://placekitten.com/200/200',
    score: 110,
  },
];

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

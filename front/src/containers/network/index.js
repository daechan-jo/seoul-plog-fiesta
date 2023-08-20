import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PageNav from '../../components/common/PageNav';
import ItemList from '../../components/network';
import * as Api from '../../api';

const MyNetworkContainer = () => {
  //현재 페이지의 Nav 정적값을 결정함
  const lists = ['group', 'user'];
  //Nav 값에 따른 view를 설정함

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const [view, setView] = useState(searchParams.get('view'));

  return (
    <main>
      <PageNav view={view} setView={setView} lists={lists} />
      <ItemList view={view} />
    </main>
  );
};

export default MyNetworkContainer;

// view 따라 다른 api를 요청하여 전체 그룹 혹은 유저 리스트를 담아서 ItemList에 전달
const mockupUser = [
  { id: '1', name: '유저이름1', region: 'gwangin' },
  { id: '2', name: '유저이름2', region: 'dongdaemun' },
  { id: '3', name: '유저이름3', region: 'gangnam' },
  { id: '4', name: '유저이름4', region: 'mapo' },
  { id: '5', name: '유저이름5', region: 'jongno' },
  { id: '6', name: '유저이름6', region: 'yongsan' },
  { id: '7', name: '유저이름7', region: 'gangbuk' },
  { id: '8', name: '유저이름8', region: 'songpa' },
  { id: '9', name: '유저이름9', region: 'seongdong' },
  { id: '10', name: '유저이름10', region: 'seodaemun' },
];

const mockupGroup = [
  {
    imgUrl: 'http://placekitten.com/200/200',
    id: 8,
    name: 'group test1',
    managerId: 7,
    goal: '잘먹고잘자기',
    region: '써울',
    introduction: '안녕하세용',
    memberLimit: 50,
    GroupUser: [
      {
        userId: 7,
      },
      {
        userId: 9,
      },
    ],
    memberCount: 2,
  },
  {
    imgUrl: 'http://placekitten.com/200/200',
    id: 9,
    name: 'group test3',
    managerId: 7,
    goal: '잘먹고잘자기',
    region: '써울',
    introduction: '안녕하세용',
    memberLimit: 50,
    GroupUser: [
      {
        userId: 7,
      },
    ],
    memberCount: 1,
  },
  {
    imgUrl: 'http://placekitten.com/200/200',
    id: 10,
    name: 'group test4',
    managerId: 7,
    goal: '잘먹고잘자기',
    region: '써울',
    introduction: '안녕하세용',
    memberLimit: 50,
    GroupUser: [
      {
        userId: 7,
      },
    ],
    memberCount: 1,
  },
  {
    imgUrl: 'http://placekitten.com/200/200',
    id: 11,
    name: 'group test5',
    managerId: 7,
    goal: '잘먹고잘자기',
    region: '써울',
    introduction: '안녕하세용',
    memberLimit: 50,
    GroupUser: [
      {
        userId: 7,
      },
    ],
    memberCount: 1,
  },
  {
    imgUrl: 'http://placekitten.com/200/200',
    id: 12,
    name: 'group test6',
    managerId: 7,
    goal: '잘먹고잘자기',
    region: '써울',
    introduction: '안녕하세용',
    memberLimit: 50,
    GroupUser: [
      {
        userId: 7,
      },
    ],
    memberCount: 1,
  },
];

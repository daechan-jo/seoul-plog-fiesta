import { useState } from 'react';
import PageNav from '../../components/common/PageNav';
import ItemList from '../../components/network/ItemList';

const MyNetworkContainer = () => {
  const [lists, setLists] = useState(['groups', 'users']);

  return (
    <main>
      <PageNav lists={lists} setLists={setLists} />
      <ItemList />
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
  { id: '1', name: '그룹이름1', region: 'gwangin' },
  { id: '2', name: '그룹이름2', region: 'dongdaemun' },
  { id: '3', name: '그룹이름3', region: 'gangnam' },
  { id: '4', name: '그룹이름4', region: 'mapo' },
  { id: '5', name: '그룹이름5', region: 'jongno' },
  { id: '6', name: '그룹이름6', region: 'yongsan' },
  { id: '7', name: '그룹이름7', region: 'gangbuk' },
  { id: '8', name: '그룹이름8', region: 'songpa' },
  { id: '9', name: '그룹이름9', region: 'seongdong' },
  { id: '10', name: '그룹이름10', region: 'seodaemun' },
];

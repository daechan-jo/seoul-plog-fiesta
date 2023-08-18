import MyInfo from '../../components/my/MyInfo';
import MyGroups from '../../components/my/MyGroups';
import MyUsers from '../../components/my/MyUsers';
import styles from './index.module.scss';

const MyContainer = () => {
  return (
    <main>
      <div className={styles.my}>
        <MyInfo />
        <div className={styles.myBox}>
          <MyGroups />
          <MyUsers />
        </div>
      </div>
    </main>
  );
};

export default MyContainer;

const myInfo = {
  name: '이름',
  nickname: '별명',
  email: 'dlapdlf@nave.rcom',
  password: '12345',
  about: '소개입니다. 조금 길면서 한줄입니다.',
  authCount: '인증카운터',
};

//인증글 불필요, 나의 모임 및 유저의 이름 목록만 가져옴 클라에서 페이지네이션 추가해야함
const mockupGroup = [
  { id: '1', name: '모임이름1', score: 100 },
  { id: '2', name: '모임이름2', score: 150 },
  { id: '3', name: '모임이름3', score: 80 },
  { id: '4', name: '모임이름4', score: 200 },
  { id: '5', name: '모임이름5', score: 120 },
  { id: '6', name: '모임이름6', score: 90 },
  { id: '7', name: '모임이름7', score: 160 },
  { id: '8', name: '모임이름8', score: 110 },
];

const mockupUser = [
  { id: '1', name: '유저이름1', score: 250 },
  { id: '2', name: '유저이름2', score: 180 },
  { id: '3', name: '유저이름3', score: 300 },
  { id: '4', name: '유저이름4', score: 150 },
  { id: '5', name: '유저이름5', score: 220 },
  { id: '6', name: '유저이름6', score: 170 },
  { id: '7', name: '유저이름7', score: 280 },
  { id: '8', name: '유저이름8', score: 200 },
  { id: '9', name: '유저이름9', score: 230 },
  { id: '10', name: '유저이름10', score: 210 },
];

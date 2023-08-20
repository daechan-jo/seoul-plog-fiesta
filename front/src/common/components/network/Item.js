import { useNavigate } from 'react-router-dom';
import styles from './index.module.scss';
import user_none from '../../../assets/user_none.png';

const Item = ({ data, view }) => {
  const navigator = useNavigate();
  /*
  {
     imgUrl: 'http://placekitten.com/200/200',
    id: 8,
    name: 'group test1',
    managerId: 7,
    goal: '잘먹고잘자기',
    region: '써울',
    memberLimit: 50,
    data.: 2,
  },
  */

  return (
    <div
      className={styles.itemContainer}
      onClick={() => {
        navigator(`/${view}/${data.id}`);
      }}
    >
      <div key={data.id}>
        <img src={data.imgUrl || user_none} alt="그룹 이미지" />
      </div>
      <ul className={styles.item}>
        <li key={data.name}>
          <label>{view} 이름</label>
          <div>{data.name}</div>
        </li>
        <li key={data.goal}>
          <label>그룹 목표</label>
          <div>{data.goal}</div>
        </li>
        <li key={data.region}>
          <label>그룹지역</label>
          <div>{data.region}</div>
        </li>
        <div>
          <div>
            {data.memberCount} / {data.memberLimit}
          </div>
        </div>
      </ul>
    </div>
  );
};

export default Item;

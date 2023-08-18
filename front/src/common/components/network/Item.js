import styles from './index.module.scss';

const Item = ({ data }) => {
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
    <div className={styles.itemContainer}>
      <div key={data.id}>
        <img src={data.imgUrl} alt={data.id} />
      </div>
      <ul className={styles.item}>
        <li key={data.name}>
          <label>그룹 이름</label>
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

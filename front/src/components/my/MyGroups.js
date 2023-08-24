import { useEffect, useState } from 'react';
import MyGroup from './MyGroup';
import styles from './index.module.scss';
import * as Api from '../../api';

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

const MyGroups = () => {
  const [datas, setDatas] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        setIsFetching(true);
        const res = await Api.get(`/group/mygroup`);
        setDatas(res.data);
      } catch (err) {
        console.log('모임데이터를 불러오는데 실패.', err);
      } finally {
        setIsFetching(false);
      }
    };

    getData();
  }, []);

  return (
    <div className={`gContainer ${styles.groupContainer}`}>
      <div className="titleContainer">
        <h1>모임관리</h1>
      </div>
      <div className={styles.shortBox}>
        {datas.length === 0 ? (
          <div>데이터가 없습니다</div>
        ) : (
          datas.map((data) => (
            <MyGroup key={`mygroup_${data.id}`} data={data} />
          ))
        )}
      </div>
    </div>
  );
};

export default MyGroups;

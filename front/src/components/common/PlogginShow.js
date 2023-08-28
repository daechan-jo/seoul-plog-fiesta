import { useEffect, useState } from 'react';
import { seoulDistricts } from './exportData';
import styles from './index.module.scss';
import * as Api from '../../api';
import { handleCreatedDate } from '../../utils/handleCreatedDate';

const PloggingShow = ({ id, setIsPlogginShowOpen }) => {
  const [isFetching, setIsFetching] = useState(false);
  const [data, setData] = useState({});

  useEffect(() => {
    const getData = async () => {
      try {
        setIsFetching(true);
        const res = await Api.get(`/plo/post/${id}`);
        setData(res.data);
      } catch (err) {
        console.log('인증글 데이터를 불러오는데 실패.', err);
      } finally {
        setIsFetching(false);
      }
    };

    getData();
  }, [id]);

  return (
    <div className="modal">
      <form className={styles.show}>
        <h1>{data.title}</h1>
        <div className="container">
          <div className="img">
            <div className={styles.imgContainer}>
              <img src={data.images} alt="인증이미지" />
            </div>
          </div>
          <div>{data.writerId}</div>
          <div>{handleCreatedDate(data.createdAt)}</div>
          <div>{handleCreatedDate(data.createdAt)}</div>
          {data.isGroupPost && <div>{data.groupName}</div>}
        </div>
        <button
          className="gBtn"
          onClick={() => {
            setIsPlogginShowOpen(false);
          }}
        >
          뒤로가기
        </button>
      </form>
    </div>
  );
};

export default PloggingShow;

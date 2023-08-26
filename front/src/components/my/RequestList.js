import { useEffect, useState } from 'react';
import styles from './index.module.scss';
import * as Api from '../../api';
import { useRecoilState } from 'recoil';
import { isRequestListOpenState } from '../../features/recoilState';

const RequestList = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [datas, setDatas] = useState([]);

  const [isRequestListOpen, setIsRequestListOpen] = useRecoilState(
    isRequestListOpenState,
  );

  useEffect(() => {
    const getData = async () => {
      try {
        setIsFetching(true);
        const res = await Api.get(`/req/list`);
        setDatas(res.data.friendRequest);
      } catch (err) {
        console.log('친구요청목록을 불러오는데 실패.', err);
      } finally {
        setIsFetching(false);
      }
    };

    getData();
  }, []);

  return (
    <div className="modal">
      <form>
        {isFetching ? (
          <div>로딩중</div>
        ) : datas.length === 0 ? (
          <div>친구 요청이 없습니다</div>
        ) : (
          datas.map((data) => <div>{data}</div>)
        )}
        <button
          onClick={() => {
            setIsRequestListOpen(false);
          }}
          className="gBtn"
        >
          뒤로가기
        </button>
      </form>
    </div>
  );
};

export default RequestList;

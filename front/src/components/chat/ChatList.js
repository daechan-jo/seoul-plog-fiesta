import { useEffect, useState } from 'react';
import styles from './index.module.scss';
import { useRecoilState } from 'recoil';
import { isChatOpenState } from '../../features/recoilState';
import * as Api from '../../api';

const ChatList = () => {
  const [datas, setDatas] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const [isChatOpen, setIsChatOpen] = useRecoilState(isChatOpenState);

  useEffect(() => {
    const getData = async () => {
      try {
        setIsFetching(true);
        const res = await Api.get('/unread');
        setDatas(res.data);
        console.log(res);
      } catch (err) {
        console.log('채팅방 리스트를 불러오는데 실패.', err);
      } finally {
        setIsFetching(false);
      }
    };

    const intervalId = setInterval(() => {
      getData();
    }, 5000);

    getData();

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className={styles.chatList}>
      {isFetching ? (
        <div>로딩중</div>
      ) : !datas || datas.length === 0 ? (
        <div>새로운 채팅을 시작하세요</div>
      ) : (
        datas.map((data) => <Item data={data} />)
      )}
    </div>
  );
};

export default ChatList;

const Item = ({ data }) => {
  return (
    <div>
      <div>_님과의 채팅</div>
      <div>{data}</div>
    </div>
  );
};

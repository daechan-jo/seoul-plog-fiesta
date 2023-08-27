import { useEffect, useState } from 'react';
import styles from './index.module.scss';
import { useRecoilState } from 'recoil';
import { isChatOpenState } from '../../features/recoilState';
import * as Api from '../../api';
import { useNavigate } from 'react-router-dom';

const ChatList = () => {
  const [datas, setDatas] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const [searchText, setSearchText] = useState('');
  const [searchResult, setSearchResult] = useState(null);

  const [isChatOpen, setIsChatOpen] = useRecoilState(isChatOpenState);

  const handleInputChange = async (event) => {
    const newSearchText = event.target.value;
    setSearchText(newSearchText);

    try {
      const res = await Api.get(`/user/${newSearchText}`);
      setSearchResult(res.data.searchNickname);
    } catch (err) {
      console.log('이름 검색데이터를 불러오는데 실패.', err);
    }
  };

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
      <input
        type="text"
        value={searchText}
        onChange={handleInputChange}
        placeholder="유저의 별명을 검색하세요"
      />
      {searchResult && <UserItem data={searchResult} />}
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

const UserItem = ({ data }) => {
  const navigator = useNavigate();

  return (
    <div>
      <div
        onClick={() => {
          navigator(`/users/${data.id}?view=main`);
        }}
      >
        {data.nickname}
      </div>
    </div>
  );
};

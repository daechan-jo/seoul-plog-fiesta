import styles from './index.module.scss';

const ChatList = ({ isFetching, datas }) => {
  return (
    <div className={styles.chatList}>
      {isFetching ? (
        <div>로딩중</div>
      ) : datas.length === 0 ? (
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
    </div>
  );
};

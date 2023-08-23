import styles from './index.module.scss';

const ChatList = ({ datas }) => {
  return (
    <div className={styles.chatList}>
      <div>채팅방1</div>
      <div>채팅방2</div>
      <div>채팅방3</div>
      <div>채팅방4</div>
    </div>
  );
};

export default ChatList;

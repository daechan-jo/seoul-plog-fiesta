import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import styles from './index.module.scss';
import { useRecoilState, useRecoilValue } from 'recoil';
import { isChatOpenState, isChatWiState } from '../../features/recoilState';
import { useSelector } from 'react-redux';

function Chat() {
  const [messages, setMessages] = useState([]); // 받은 채팅 메시지를 저장함
  const [messageText, setMessageText] = useState(''); // 메시지 input값을 저장

  const userToken = localStorage.getItem('userToken');

  const user = useSelector((state) => state.user);

  const [, setIsChatOpen] = useRecoilState(isChatOpenState);
  const [chatId] = useRecoilState(isChatWiState);

  // 웹 소켓을 연결함
  const socket = io.connect('ws://localhost:3001', {
    path: '/chat',
    extraHeaders: {
      Authorization: `Bearer ${userToken}`, // JWT 토큰을 전달
    },
  });

  socket.on('connect', () => {
    console.log('소켓이 연결되었습니다.');
  });

  socket.on('connect_error', (error) => {
    console.log('소켓 연결 에러:', error);
  });

  socket.on('error', (error) => {
    console.log('소켓 에러:', error);
  });

  socket.on('disconnect', (reason) => {
    console.log('소켓이 연결이 끊어졌습니다. 사유:', reason);
  });

  useEffect(() => {
    if (!socket) {
      console.log('socket 생성 에러');
      return;
    } // 웹 소켓 연결 실패 혹은 없을 시 종료함

    // 백에 상대방의 id를 전달하여 RoomID 찾기 혹은 생성
    socket.emit('joinRoom', chatId);

    // 초기 메시지들을 받음
    socket.on('messages', (receivedMessages) => {
      try {
        console.log('초기메시지: ', receivedMessages);
        setMessages(receivedMessages);
      } catch (error) {
        console.log('Error in messages event:', error);
      }
    });
    // 새로운 메시지를 받음
    socket.on('message', (newMessage) => {
      try {
        console.log('보낸 메시지: ', newMessage);
        // 기존 메시지리스트에 받은 메시지를 추가함
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      } catch (error) {
        console.log('Error in message event:', error);
      }
    });

    return () => {
      // 컴포넌트를 나가면 방을 나감
      socket.emit('leaveRoom', chatId);
    };
  }, [socket, chatId]);

  // 클라에서 메시지를 전송하는 함수
  const sendMessage = async () => {
    if (!socket || !messageText.trim()) return; // 연결이 실패 및 없음 혹은 빈 메시지면 종료함

    console.log('메시지를 보냄: ', messageText);
    // 메시지를 서버에 전송
    try {
      const res = await socket.emit('sendMessage', chatId, messageText);
      console.log('백에서 받은값: ', res);
      setMessageText('');
    } catch (err) {
      console.log('메시지 보내기 실패', err.response.data.message);
    }
  };

  return (
    <div className={styles.chat}>
      <div>
        {messages.map((message, index) => (
          <div key={index}>
            {message.senderId === user.loginId
              ? '나의 메시지: '
              : `${chatId}의 메시지: `}
            {message.message}
          </div>
        ))}
      </div>
      <div>
        <input
          type="text"
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
        />
        <button className="gBtn" onClick={sendMessage}>
          전송
        </button>
        <button
          className="gBtn"
          onClick={() => {
            setIsChatOpen(false);
          }}
        >
          뒤로가기
        </button>
      </div>
    </div>
  );
}

export default Chat;

import { useEffect, useRef } from 'react';

const useWebSocket = (url) => {
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = new WebSocket(url);
    console.log('연결신청');
    return () => {
      socketRef.current.close();
    };
  }, [url]);

  return socketRef.current;
};

export default useWebSocket;

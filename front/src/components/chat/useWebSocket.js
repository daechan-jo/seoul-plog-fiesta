import { useEffect, useRef } from 'react';

const useWebSocket = (url) => {
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = new WebSocket(url);

    return () => {
      socketRef.current.close();
    };
  }, [url]);

  return socketRef.current;
};

export default useWebSocket;

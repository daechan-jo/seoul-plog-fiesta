import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const useIsLogin = () => {
  const user = useSelector((state) => state.user);
  const navigator = useNavigate();
  const token = localStorage.getItem('userToken');

  useEffect(() => {
    if (!token || user.email === '') {
      navigator('/intro');
    }
  }, [navigator, token, user]);
};

export default useIsLogin;

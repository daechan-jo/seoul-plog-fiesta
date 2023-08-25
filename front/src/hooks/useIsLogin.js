import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const useIsLogin = () => {
  const user = useSelector((state) => state.user);
  const navigator = useNavigate();
  const token = sessionStorage.getItem('userToken');
  console.log(user);
  useEffect(() => {
    if (!token) {
      navigator('/intro');
    }
  }, [navigator, token]);
};

export default useIsLogin;

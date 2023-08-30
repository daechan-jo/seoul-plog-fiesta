import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const useIsLogin = () => {
  const user = useSelector((state) => state.user);
  const navigator = useNavigate();
  const token = localStorage.getItem('userToken');
  console.log(user);
  useEffect(() => {
    if (!token || user.email === '') {
      console.log('이동');
      console.log(token);
      console.log(user);
      navigator('/intro');
    }
  }, [navigator, token, user]);
};

export default useIsLogin;

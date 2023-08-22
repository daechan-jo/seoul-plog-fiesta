import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const useIsLogin = () => {
  const user = useSelector((state) => state.user);
  const navigator = useNavigate();

  console.log(user);
  useEffect(() => {
    if (!user.email) {
      navigator('/intro');
    }
  }, [navigator, user]);
};

export default useIsLogin;

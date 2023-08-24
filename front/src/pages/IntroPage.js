import { useEffect } from 'react';
import IntroContainer from '../containers/intro';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useIsLogin from '../hooks/useIsLogin';

const IntroPage = () => {
  const navigator = useNavigate();
  const user = useSelector((state) => state.user);
  const token = sessionStorage.getItem('userToken');

  useEffect(() => {
    if (token) {
      navigator('/');
    }
  });
  return <IntroContainer />;
};

export default IntroPage;

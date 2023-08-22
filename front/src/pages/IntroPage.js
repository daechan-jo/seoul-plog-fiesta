import { useEffect } from 'react';
import IntroContainer from '../containers/intro';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useIsLogin from '../hooks/useIsLogin';

const IntroPage = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  useIsLogin();

  return <IntroContainer />;
};

export default IntroPage;

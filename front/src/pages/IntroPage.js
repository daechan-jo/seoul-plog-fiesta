import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Intro from '../components/intro/Intro';

const IntroPage = () => {
  const navigator = useNavigate();
  const user = useSelector((state) => state.user);
  const token = sessionStorage.getItem('userToken');

  useEffect(() => {
    if (token && !user.email === '') {
      navigator('/');
    }
  });
  return <Intro />;
};

export default IntroPage;

import Intro from '../../components/intro/Intro';
import Login from "../../components/user/Login";
import { useState } from "react";

const IntroContainer = () => {
  const [isLogin, setIsLogin] = useState(false);
  return (
    <div>
      {isLogin ? <Login /> : <Intro />}
    </div >
  );
};

export default IntroContainer;

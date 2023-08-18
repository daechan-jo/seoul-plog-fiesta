import Intro from '../../components/intro/Intro';
import UserContainer from "../user";
import { useState } from "react";

const IntroContainer = () => {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <div>
      {/* 컨테이너 안에 컨테이너가 들어가도 괜찮을지 모르겠음 -> 이슈생성함 */}
      {isLogin ? <UserContainer /> : <Intro />}
    </div >
  );
};

export default IntroContainer;

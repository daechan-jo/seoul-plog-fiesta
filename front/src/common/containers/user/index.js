import Login from "../../components/user/Login";
import Register from "../../components/user/Register";
import { useState } from "react";

const UserContainer = () => {
  const [isLogin, setIsLogin] = useState(false);
  return <main>
    {isLogin ? <Login /> : <Register />}
  </main>;
};

export default UserContainer;

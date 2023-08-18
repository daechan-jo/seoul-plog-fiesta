import { useParams } from 'react-router-dom';
import Login from '../../components/user/Login';
import Register from '../../components/user/Register';
import { useState } from 'react';

const UserContainer = () => {
  const { path } = useParams();
  console.log(path);
  // TODO: 현재 path 안불러와짐
  return <main>{path === 'login' ? <Login /> : <Register />}</main>;
};

export default UserContainer;

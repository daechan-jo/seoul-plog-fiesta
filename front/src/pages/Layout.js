import React, { useState } from 'react';
import Header from '../components/layout/Header';
import Nav from '../components/layout/Nav';
import Plogging from '../components/common/Plogging';
import ErrorModal from '../components/common/ErrorModal';
import { useRecoilState } from 'recoil';
import { isErrorState } from '../features/recoilState';

const Layout = ({ children }) => {
  const [isWriting, setIsWriting] = useState(false);
  const [isError, setIsError] = useRecoilState(isErrorState);
  return (
    <>
      <Header setIsWriting={setIsWriting} />
      <Nav />
      {isError && <ErrorModal />}
      {isWriting && <Plogging setIsWriting={setIsWriting} />}
      {children}
    </>
  );
};

export default Layout;

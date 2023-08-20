import React, { useState } from 'react';
import Header from '../components/layout/Header';
import Nav from '../components/layout/Nav';
import Plogging from '../components/common/Plogging';
import ErrorModal from '../components/common/ErrorModal';

const Layout = ({ children }) => {
  const [isWriting, setIsWriting] = useState(false);
  const [isError, setIsError] = useState(true);
  return (
    <>
      <Header setIsWriting={setIsWriting} />
      <Nav />
      {isError && <ErrorModal setIsError={setIsError} />}
      {isWriting && <Plogging setIsWriting={setIsWriting} />}
      {children}
    </>
  );
};

export default Layout;

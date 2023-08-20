import React, { useState } from 'react';
import Header from '../common/components/layout/Header';
import Nav from '../common/components/layout/Nav';
import Plogging from '../common/components/common/Plogging';
import ErrorModal from '../common/components/common/ErrorModal';

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

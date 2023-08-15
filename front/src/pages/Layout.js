import React from 'react';
import Header from '../components/common/Header';
import Nav from '../components/common/Nav';

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <Nav />
      {children}
    </>
  );
};

export default Layout;

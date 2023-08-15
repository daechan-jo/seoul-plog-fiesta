import React from 'react';
import Header from '../components/layout/Header';
import Nav from '../components/layout/Nav';

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

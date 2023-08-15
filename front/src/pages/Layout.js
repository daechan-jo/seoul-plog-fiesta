import React, { useState } from 'react';
import Header from '../components/layout/Header';
import Nav from '../components/layout/Nav';
import Plogging from '../components/common/Plogging';

const Layout = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (!isModalOpen) {
    return (
      <>
        <Header isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
        <Nav />
        {children}
      </>
    );
  }
  return <Plogging isOpen={isModalOpen} closeModal={closeModal} />;
};

export default Layout;

import React, { useState } from 'react';
import Header from '../common/components/layout/Header';
import Nav from '../common/components/layout/Nav';
import Plogging from '../common/components/common/Plogging';

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

import Modal from 'react-modal';

const Plogging = ({ isOpen, closeModal }) => {
  const modalStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      transform: 'translate(-50%, -50%)',
      width: '70%',
      maxHeight: '80vh',
    },
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Authentication Modal"
      style={modalStyles}
    >
      <div className="gContainer">
        <div className="titleContainer">
          <h1>인증하기</h1>
        </div>
        <div className="contentContainer">지도 넣을겁니다.</div>
        <button onClick={closeModal}>Close Modal</button>
      </div>
    </Modal>
  );
};

export default Plogging;

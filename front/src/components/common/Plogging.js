import styles from './index.module.scss';
import Modal from 'react-modal';

const Plogging = ({ isOpen, closeModal }) => {
  const modalStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      transform: 'translate(-50%, -50%)',
      width: '80vw',
      height: '80vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Authentication Modal"
      style={modalStyles}
    >
      <div className={styles.plogging}>
        <div className={styles.titleContainer}>
          <h1>인증하기</h1>
        </div>
        <div className={styles.contentContainer}>지도 넣을겁니다.</div>
        <button className onClick={closeModal}>
          Close Modal
        </button>
      </div>
    </Modal>
  );
};

export default Plogging;

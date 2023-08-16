import styles from './index.module.scss';

const ErrorModal = ({ setIsError }) => {
  const message = '오류났어용';
  return (
    <div className={styles.errorModal}>
      <div>
        <button onClick={() => setIsError(false)}>X</button>
        {message}
      </div>
    </div>
  );
};

export default ErrorModal;

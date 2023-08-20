import { useRecoilState } from 'recoil';
import { errorMessageState, isErrorState } from '../../features/recoilState';
import styles from './index.module.scss';

const ErrorModal = () => {
  const [isError, setIsError] = useRecoilState(isErrorState);
  const [errorMessage, setErrorMessage] = useRecoilState(errorMessageState);

  setTimeout(() => {
    setIsError(false);
  });

  return (
    <div className={styles.errorModal}>
      <div>
        <button onClick={() => setIsError(false)}>X</button>
        {errorMessage}
      </div>
    </div>
  );
};

export default ErrorModal;

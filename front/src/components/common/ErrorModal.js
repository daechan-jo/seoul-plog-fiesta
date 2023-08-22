import { useRecoilState } from 'recoil';
import { errorMessageState, isErrorState } from '../../features/recoilState';
import styles from './index.module.scss';
import { useEffect } from 'react';

const ErrorModal = () => {
  const [isError, setIsError] = useRecoilState(isErrorState);
  const [errorMessage, setErrorMessage] = useRecoilState(errorMessageState);

  useEffect(() => {
    setTimeout(() => {
      setIsError(false);
    }, 2000);

    return clearTimeout(() => {});
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

import styles from './index.module.scss';
import { useState } from 'react';

const MyInfo = () => {
  const [isEditing, setIsEditing] = useState(false);
  if (!isEditing) {
    return (
      <div className="gContainer">
        <div className="titleContainer">
          <h1>내 정보</h1>
        </div>
        <div className={styles.box}>
          <label>이메일</label>
        </div>
      </div>
    );
  }
  return (
    <div className="gContainer">
      <div className="titleContainer">
        <h1>내 정보</h1>
      </div>
      <form className="contentContainer">
        <label>이메일</label>
      </form>
    </div>
  );
};

export default MyInfo;

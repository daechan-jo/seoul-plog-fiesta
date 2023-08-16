import styles from './index.module.scss';
import { FaRegUserCircle } from 'react-icons/fa';

const PloggingForm = ({ closeModal }) => {
  function handleImgChange(e) {
    const img = e.target.files[0];

    if (!img) {
      alert('JPG 확장자의 이미지 파일을 넣어주세요.');
      return;
    } else if (img.type !== 'image/jpeg' && img.type !== 'image/jpg') {
      alert('JPG 확장자의 이미지 파일만 등록 가능합니다.');
      return;
    }
    if (img) {
      try {
        const reader = new FileReader();

        reader.onload = () => {
          const previewImg = document.getElementById('previewImg');
          previewImg.src = reader.result;
        };

        reader.readAsDataURL(img);
      } catch (e) {
        alert(e);
      }
    }
  }

  return (
    <form className={styles.ploggingFormContainer}>
      <div className={styles.ploggingForm}>
        <div>
          <div className={styles.imgContainer}>
            <img id="previewImg" alt="인증이미지" />
          </div>
          <input type="file" name="file" onChange={handleImgChange} />
        </div>
        <div className={styles.content}>
          <label>장소</label>
          <input />
          <label>쓰레기 양</label>
          <input />
          <label>거리(km)</label>
          <input />
          <label>평균 페이스</label>
          <input />
          <label>설명</label>
          <textarea type="text" />
        </div>
      </div>
      <div className={styles.btns}>
        <button type="submit">인증하기</button>
        <button type="button" onClick={closeModal} className={styles.back}>
          뒤로가기
        </button>
      </div>
    </form>
  );
};

export default PloggingForm;

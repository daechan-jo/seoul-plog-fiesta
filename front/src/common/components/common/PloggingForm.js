import { useState } from 'react';
import styles from './index.module.scss';
import { FaRegUserCircle } from 'react-icons/fa';
import { seoulDistricts } from './exportData';
import { handleImgChange } from '../../../utils';

const PloggingForm = ({ closeModal }) => {
  const [formData, setFormData] = useState({
    region: '',
    location: '',
    distance: '',
    trashAmount: '',
    averagePace: '',
    description: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // 폼 데이터를 이용하여 API 호출 또는 다른 작업 수행
    console.log(formData);
  };

  return (
    <form className={styles.ploggingFormContainer} onSubmit={handleSubmit}>
      <div className={styles.ploggingForm}>
        <div>
          <div className={styles.imgContainer}>
            <img id="previewImg" alt="인증이미지" />
          </div>
          <input type="file" name="file" onChange={handleImgChange} />
        </div>
        <div className={styles.content}>
          <label>장소</label>
          <select
            name="region"
            value={formData.region}
            onChange={handleInputChange}
          >
            <option value="">자치구 선택</option>
            {Object.keys(seoulDistricts).map((region) => (
              <option key={region} value={region}>
                {seoulDistricts[region]}
              </option>
            ))}
          </select>
          <input />
          <label>쓰레기 양</label>
          <input
            type="text"
            name="trashAmount"
            value={formData.trashAmount}
            onChange={handleInputChange}
          />
          <label>거리(km)</label>
          <input
            type="text"
            name="distance"
            value={formData.distance}
            onChange={handleInputChange}
          />
          <label>평균 페이스</label>
          <input
            type="text"
            name="averagePace"
            value={formData.averagePace}
            onChange={handleInputChange}
          />
          <label>설명</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />
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

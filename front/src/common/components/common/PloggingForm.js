import { useState } from 'react';
import styles from './index.module.scss';
import { FaRegUserCircle } from 'react-icons/fa';

const seoulDistricts = {
  gangnam: '강남구',
  gangdong: '강동구',
  gangbuk: '강북구',
  gangseo: '강서구',
  gwanak: '관악구',
  gwangjin: '광진구',
  guro: '구로구',
  geumcheon: '금천구',
  nowon: '노원구',
  dobong: '도봉구',
  dongdaemun: '동대문구',
  dongjak: '동작구',
  mapo: '마포구',
  seodaemun: '서대문구',
  seocho: '서초구',
  seongdong: '성동구',
  seongbuk: '성북구',
  songpa: '송파구',
  yangcheon: '양천구',
  yeongdeungpo: '영등포구',
  yongsan: '용산구',
  eunpyeong: '은평구',
  jongno: '종로구',
  jung: '중구',
  jungnang: '중랑구',
};

const PloggingForm = ({ closeModal }) => {
  const [formData, setFormData] = useState({
    region: '',
    location: '',
    distance: '',
    trashAmount: '',
    averagePace: '',
    description: '',
  });

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

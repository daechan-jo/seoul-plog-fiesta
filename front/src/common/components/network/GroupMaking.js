import { useEffect, useState } from 'react';
import styles from './index.module.scss';
import * as Api from '../../../api';
import { useNavigate } from 'react-router-dom';
import { seoulDistricts } from '../common/exportData';
import { handleImgChange } from '../../../utils';

const GroupMaking = ({ setIsModal }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    managerId: '',
    goal: '',
    region: '',
    introduction: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await Api.registerPost('/group', formData);
      setIsModal(false);
    } catch (err) {
      console.log('회원가입에 실패하였습니다.', err);
    }
  };

  return (
    <div className="modal">
      <form>
        <h1>그룹생성</h1>
        <div className="container">
          <div className="img">
            <div className="img-container">
              <img id="previewImg" alt="인증이미지" />
            </div>
            <input type="file" name="imgUrl" onChange={handleImgChange} />
          </div>
          <div className="content">
            <div>
              <label>그룹 이름</label>
              <input
                type="text"
                name="name"
                placeholder="그룹 이름"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>그룹 목표</label>
              <input
                type="text"
                name="goal"
                placeholder="그룹 목표"
                value={formData.goal}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>그룹 지역구</label>
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
            </div>
            <div>
              <label>그룹 소개</label>
              <textarea
                type="text"
                name="introduction"
                placeholder="그룹 소개"
                value={formData.introduction}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
        <button type="submit" onClick={handleSubmit} className="gBtn">
          그룹 생성
        </button>
        <button
          type="button"
          onClick={() => {
            setIsModal(false);
          }}
          className={styles.back}
        >
          뒤로가기
        </button>
      </form>
    </div>
  );
};

export default GroupMaking;

import { useEffect, useState } from 'react';
import styles from './index.module.scss';
import * as Api from '../../api';
import { useNavigate } from 'react-router-dom';
import { seoulDistricts } from '../common/exportData';
import { useSelector } from 'react-redux';
import { useRecoilState } from 'recoil';
import { errorMessageState, isErrorState } from '../../features/recoilState';
import post_none from '../../assets/post_none.png';

const GroupMaking = ({ setIsModal, setDatas }) => {
  const loginId = useSelector((state) => state.user.loginId);

  const [isError, setIsError] = useRecoilState(isErrorState);
  const [errorMessage, setErrorMessage] = useRecoilState(errorMessageState);
  const [imgContainer, setImgContainer] = useState();

  const [formData, setFormData] = useState({
    name: '',
    goal: '',
    region: '',
    introduction: '',
  });

  const imgData = new FormData();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImgChange = (e) => {
    const img = e.target.files[0];

    if (!img) {
      alert('이미지 파일을 넣어주세요.');
      return;
    } else if (
      img.type !== 'image/png' &&
      img.type !== 'image/jpeg' &&
      img.type !== 'images/jpg'
    ) {
      alert('JPG 혹은 PNG확장자의 이미지 파일만 등록 가능합니다.');
      return;
    }

    if (img) {
      try {
        const reader = new FileReader();

        reader.onload = () => {
          const previewImg = document.getElementById('GroupPreviewImg');
          previewImg.src = reader.result;
        };

        reader.readAsDataURL(img);

        setImgContainer(img);
      } catch (e) {
        alert(e);
      }
    }
  };

  const uploadImage = async (groupId) => {
    try {
      const res = await Api.postForm(`/upload/groupimg/${groupId}`, {
        groupImage: imgContainer,
      });
      return res;
    } catch (err) {
      console.log('이미지 업로드 에러', err.response.data.message);
      throw err;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const postRes = await Api.post('/group', formData);

      if (imgData) {
        const imageUploadRes = await uploadImage(postRes.data.id, imgData);
        console.log('이미지 업로드 결과:', imageUploadRes);
      }

      postRes.data['memberCount'] = 1;
      setDatas((datas) => [...datas, postRes.data]);
      setIsModal(false);
      setErrorMessage('그룹이 생성되었습니다.');
      setIsError(true);
    } catch (err) {
      console.log('에 실패하였습니다.', err.response.data.message);
    }
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit}>
        <h1>그룹생성</h1>
        <div className="container">
          <div className="img">
            <div className="img-container">
              <img src={post_none} id="GroupPreviewImg" alt="인증이미지" />
            </div>
            <input
              type="file"
              name="imgUrl"
              accept=".jpg, .jpeg, .png, .gif"
              onChange={handleImgChange}
            />
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
        <button type="submit" className="gBtn">
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

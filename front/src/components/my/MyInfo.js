import styles from './index.module.scss';
import React, { useEffect, useState } from 'react';
import user_none from '../../assets/user_none.png';
import * as Api from '../../api';
import { handleImgChange } from '../../utils';
import { seoulDistricts } from '../common/exportData';

const initialData = {
  name: '',
  nickname: '',
  about: '',
  region: '',
};

//{ id, name, nickname, password, about, activity }

const MyInfo = () => {
  const [img, setImg] = useState();
  const [isEditing, setIsEditing] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [data, setData] = useState(initialData);

  const formData = new FormData();

  const handleImgChange = (e) => {
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
          const previewImg = document.getElementById('myInfoPreviewImg');
          previewImg.src = reader.result;
        };

        reader.readAsDataURL(img);
        formData.append('image', img);
      } catch (e) {
        alert(e);
      }
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    try {
      const res = await Api.post('/auth/update', {
        name: data.name,
        nickname: data.nickname,
        about: data.about,
        region: data.region,
      });
      setData(res.data);
      if (img) {
        const res = await Api.postForm('/upload/userimg', formData);
      }
      setIsEditing(false);
    } catch (err) {
      console.log('데이터 수정 실패.', err);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    const getDatas = async () => {
      setIsFetching(true);
      try {
        await Api.get('/user').then((res) => {
          console.log(res.data.currentUserInfo);
          setData({
            email: res.data.currentUserInfo.email,
            name: res.data.currentUserInfo.name,
            nickname: res.data.currentUserInfo.nickname,
            about: res.data.currentUserInfo.about,
            region: res.data.currentUserInfo.activity,
          });
        });
        await Api.get('/profile/image').then((res) => setImg(res.data));
      } catch (err) {
        console.log('데이터를 불러오는데 실패.', err);
      } finally {
        setIsFetching(false);
      }
    };
    console.log('데이터가져오기');
    getDatas();
  }, []);

  return (
    <div className={`gContainer ${styles.InfoContainer}`}>
      <div className="titleContainer">
        <h1>내 정보</h1>
      </div>
      <ul className={`${styles.info} ${isEditing ? styles.editing : ''}`}>
        <div className={styles.imgContainer}>
          <img id="myInfoPreviewImg" src={img || user_none} alt="profile" />
        </div>
        <>
          {isEditing && (
            <li>
              <input type="file" accept="image/*" onChange={handleImgChange} />
            </li>
          )}
          <li>
            <label>이메일</label>
            <div>{data.email}</div>
          </li>
          <li>
            <label>이름</label>
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={data.name}
                onChange={handleInputChange}
              />
            ) : (
              <div>{data.name}</div>
            )}
          </li>
          <li>
            <label>별명</label>
            {isEditing ? (
              <input
                type="text"
                name="nickname"
                value={data.nickname}
                onChange={handleInputChange}
              />
            ) : (
              <div>{data.nickname}</div>
            )}
          </li>
          <li>
            <label>소개</label>
            {isEditing ? (
              <input
                type="text"
                name="about"
                value={data.about}
                onChange={handleInputChange}
              />
            ) : (
              <div>{data.about}</div>
            )}
          </li>
          <li>
            <label>지역구</label>
            {isEditing ? (
              <select
                name="region"
                value={data.region}
                onChange={handleInputChange}
              >
                {Object.keys(seoulDistricts).map((region) => (
                  <option key={region} value={region}>
                    {seoulDistricts[region]}
                  </option>
                ))}
              </select>
            ) : (
              <div>{seoulDistricts[data.region]}</div>
            )}
          </li>
        </>
      </ul>
      <div>
        {isEditing ? (
          <>
            <button
              className="gBtn"
              onClick={() => {
                handleSubmit();
                setIsEditing(false);
              }}
            >
              수정완료
            </button>
            <button
              className="gBtn"
              onClick={() => {
                setIsEditing(false);
              }}
            >
              수정취소
            </button>
            <button
              className="gBtn"
              onClick={() => {
                setData(data);
              }}
            >
              초기화
            </button>
          </>
        ) : (
          <>
            <button
              className="gBtn"
              onClick={() => {
                setIsEditing(true);
              }}
            >
              수정하기
            </button>
            <button
              className="gBtn"
              onClick={() => {
                setData(data);
              }}
            >
              탈퇴하기
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default React.memo(MyInfo);

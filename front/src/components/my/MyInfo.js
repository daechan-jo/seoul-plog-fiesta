import styles from './index.module.scss';
import React, { useEffect, useState } from 'react';
import user_none from '../../assets/user_none.png';
import * as Api from '../../api';
import { seoulDistricts } from '../common/exportData';
import { useDispatch } from 'react-redux';
import { logout } from '../../features/user/userSlice';

const initialData = {
  name: '',
  nickname: '',
  about: '',
  activity: '',
  password: '',
  confirmPassword: '',
};

const MyInfo = () => {
  const [img, setImg] = useState();
  const [isEditing, setIsEditing] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [data, setData] = useState(initialData);
  const dispatch = useDispatch();
  const [imgContainer, setImgContainer] = useState();

  const formData = new FormData();

  const handleImgChange = (e) => {
    const img = e.target.files[0];

    if (!img) {
      alert('JPG 확장자의 이미지 파일을 넣어주세요.');
      return;
    } else if (img.type !== 'image/jpeg' && img.type !== 'images/jpg') {
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
        setImgContainer(img);
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
      const res = await Api.put('/auth/update', {
        name: data.name,
        nickname: data.nickname,
        about: data.about,
        activity: data.activity,
        password: data.password,
        confirmPassword: data.passwordConfirm,
      });
      setData(res.data);
      if (imgContainer) {
        console.log('이미지업로드', imgContainer);
        try {
          const res = await Api.postForm(`/upload/profile`, {
            profileImage: imgContainer,
          });
          return res;
        } catch (err) {
          console.log('이미지 업로드 에러', err);
          throw err;
        }
      }
      setIsEditing(false);
    } catch (err) {
      console.log('데이터 수정 실패.', err);
    } finally {
      setIsFetching(false);
    }
  };

  const handleDelete = async () => {
    try {
      await Api.delete('/auth/drop');
      alert('계정 삭제 완료');
      dispatch(logout());
      navigator('/intro');
    } catch (err) {
      console.log('계정삭제 실패.', err);
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
            activity: res.data.currentUserInfo.activity,
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
            <li key="img">
              <input type="file" accept="image/*" onChange={handleImgChange} />
            </li>
          )}
          <li key="email">
            <label>이메일</label>
            <div>{data.email}</div>
          </li>
          <li key="name">
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
          <li key="nickname">
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
          <li key="about">
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
          <li key="region">
            <label>지역구</label>
            {isEditing ? (
              <select
                name="activity"
                value={data.activity}
                onChange={handleInputChange}
              >
                {Object.keys(seoulDistricts).map((activity) => (
                  <option key={activity} value={activity}>
                    {seoulDistricts[activity]}
                  </option>
                ))}
              </select>
            ) : (
              <div>{seoulDistricts[data.activity]}</div>
            )}
          </li>
          {isEditing && (
            <li key="pw">
              <label>비밀번호 입력</label>
              <input
                type="password"
                name="password"
                value={data.password}
                onChange={handleInputChange}
              />
            </li>
          )}
          {isEditing && (
            <li key="passwordConfirm">
              <label>비밀번호 확인</label>
              <input
                type="password"
                name="passwordConfirm"
                value={data.passwordConfirm}
                onChange={handleInputChange}
              />
            </li>
          )}
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
                setData(initialData);
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
            <button className="gBtn" onClick={handleDelete}>
              탈퇴하기
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default MyInfo;

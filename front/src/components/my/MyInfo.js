import styles from './index.module.scss';
import React, { useEffect, useState } from 'react';
import user_none from '../../assets/user_none.png';
import * as Api from '../../api';
import { seoulDistricts } from '../common/exportData';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../features/user/userSlice';
import { handleImgUrl } from '../../utils/handleImgUrl';

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
  const [originData, setDriginData] = useState(initialData);
  const dispatch = useDispatch();
  const [imgContainer, setImgContainer] = useState();
  const [isChanging, setIsChanging] = useState(false);

  const formData = new FormData();
  const navigator = useNavigate();

  const user = useSelector((state) => state.user);

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
      setData(originData);
    } finally {
      setIsFetching(false);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm('정말로 탈퇴하시겠습니까?');
    if (confirmDelete) {
      try {
        const res = await Api.delete('/auth/drop');
        if (res.status === 200) {
          alert('계정 삭제 완료');
          dispatch(logout());
          navigator('/intro');
        } else {
          alert(res.data);
        }
      } catch (err) {
        console.log('계정삭제 실패.', err);
      }
    } else {
      console.log('그룹 탈퇴가 취소되었습니다.');
    }
  };

  useEffect(() => {
    const getDatas = async () => {
      setIsFetching(true);
      try {
        await Api.get('/user').then((res) => {
          console.log(res.data.currentUserInfo);
          setDriginData({
            email: res.data.currentUserInfo.email,
            name: res.data.currentUserInfo.name,
            nickname: res.data.currentUserInfo.nickname,
            about: res.data.currentUserInfo.about,
            activity: res.data.currentUserInfo.activity,
          });
          setData({
            email: res.data.currentUserInfo.email,
            name: res.data.currentUserInfo.name,
            nickname: res.data.currentUserInfo.nickname,
            about: res.data.currentUserInfo.about,
            activity: res.data.currentUserInfo.activity,
          });
        });
        await Api.get(`/profileimg/${user.loginId}`).then((res) =>
          setImg(res.data),
        );
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
          <img
            id="myInfoPreviewImg"
            src={handleImgUrl(img) || user_none}
            alt="profile"
          />
        </div>
        <>
          {isEditing && (
            <input
              className={styles.imgInput}
              type="file"
              accept="image/*"
              onChange={handleImgChange}
            />
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
                setData(originData);
                setIsEditing(false);
              }}
            >
              수정취소
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
            <button
              className="gBtn"
              onClick={() => {
                setIsChanging(true);
              }}
            >
              비밀번호 변경
            </button>
            {isChanging && <PasswordChange setIsChanging={setIsChanging} />}
          </>
        )}
      </div>
    </div>
  );
};

export default MyInfo;

const PasswordChange = ({ setIsChanging }) => {
  const [data, setData] = useState({
    password: '',
    newPassword: '',
    newConfirmPassword: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    for (const key in data) {
      if (data[key] === '') {
        alert('입력값을 확인해주세요');
        return;
      }
    }

    try {
      await Api.put('/auth/login/update', data);
      setIsChanging(false);
    } catch (err) {
      alert('비밀번호 변경 실패', err);
    }
  };
  return (
    <div className="modal">
      <form className={styles.changingForm} onSubmit={handleSubmit}>
        <label>기존 비밀번호 입력</label>
        <input
          type="password"
          name="password"
          value={data.password}
          onChange={handleInputChange}
        />
        <label>새로운 비밀번호 입력</label>
        <input
          type="password"
          name="newPassword"
          value={data.newPassword}
          onChange={handleInputChange}
        />
        <label>새로운 비밀번호 확인</label>
        <input
          type="password"
          name="newConfirmPassword"
          value={data.newConfirmPassword}
          onChange={handleInputChange}
        />
        <div>
          <button className="gBtn" type="submit">
            비밀번호 변경
          </button>
          <button
            className="gBtn"
            type="button"
            onClick={() => {
              setIsChanging(false);
            }}
          >
            뒤로가기
          </button>
        </div>
      </form>
    </div>
  );
};

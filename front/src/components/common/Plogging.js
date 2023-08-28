import { useEffect, useState } from 'react';
import { seoulDistricts } from './exportData';
import styles from './index.module.scss';
import * as Api from '../../api';

const Plogging = ({ setIsWriting }) => {
  const [formData, setFormData] = useState({
    region: '',
    location: '',
    distance: '',
    trashAmount: '',
    averagePace: '',
    description: '',
    title: '',
    startTime: '',
    endTime: '',
    isGroupPost: false,
  });
  const [groupData, setGroupData] = useState({
    groupName: '',
    participants: [],
  });

  const [imgContainer, setImgContainer] = useState();
  const [isGroupPost, setIsGroupPost] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

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
          const previewImg = document.getElementById('proggingPreviewImg');
          previewImg.src = reader.result;
        };

        reader.readAsDataURL(img);
        setImgContainer(img);
      } catch (e) {
        alert(e);
      }
    }
  };

  const uploadImage = async (postId) => {
    try {
      const res = await Api.postForm(`/upload/certimg/${postId}`, {
        postImage: imgContainer,
      });
      return res;
    } catch (err) {
      console.log('이미지 업로드 에러', err);
      throw err;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isGroupPost) {
      setFormData((prev) => ({ ...prev, ...groupData, isGroupPost: true }));
    }
    try {
      const postRes = await Api.post('/plo/post', formData);
      if (imgContainer) {
        const imageUploadRes = await uploadImage(postRes.data.id);
        console.log('이미지 업로드 결과:', imageUploadRes);
      }
      setIsWriting(false);
    } catch (err) {
      alert('인증 글 업로드 실패', err);
    }
  };

  const [groupName, setGroupName] = useState([]);
  const [groupMembers, setGroupMembers] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await Api.get(`/group/mygroup`);

        setGroupName(res.data.map((item) => item.name));
      } catch (err) {
        console.log('나의 그룹 리스트 실패', err);
      }
    };

    getData();
  }, []);

  useEffect(() => {
    const fetchGroupMembers = async () => {
      if (groupData.groupName) {
        try {
          const res = await Api.get(`/group/members/${groupData.groupName}`);
          setGroupMembers(res.data);
        } catch (err) {
          console.log('그룹 멤버 리스트를 가져오는데 실패.', err);
        }
      }
    };

    fetchGroupMembers();
  }, [groupData.groupName]);

  return (
    <div className="modal">
      <form className={styles.plogging} onSubmit={handleSubmit}>
        <h1>인증하기</h1>{' '}
        <div className="container">
          <div className="img">
            <div className={styles.imgContainer}>
              <img id="proggingPreviewImg" alt="인증이미지" />
            </div>
            <input type="file" name="file" onChange={handleImgChange} />
            <div>
              <input
                type="checkbox"
                checked={isGroupPost}
                onChange={(e) => setIsGroupPost(e.target.checked)}
              />
              <div>그룹 여부</div>
            </div>
            {isGroupPost && (
              <div>
                <select
                  name="groupName"
                  value={groupData.groupName}
                  onChange={handleInputChange}
                >
                  <option value="">그룹이름</option>
                  {groupName.map((name) => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
                <select
                  name="participants"
                  value={groupData.participants}
                  onChange={handleInputChange}
                >
                  <option value="">멤버이름</option>
                  {groupMembers.map((name) => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
          <div className={styles.content}>
            <div>
              <label>제목</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
              />
            </div>
            <div className={styles.time}>
              <label>시작 시간</label>
              <input
                type="text"
                name="startTime"
                value={formData.startTime}
                onChange={handleInputChange}
                placeholder="시작 시간 (예: 14:00)"
              />
              <label>종료 시간</label>
              <input
                type="text"
                name="endTime"
                value={formData.endTime}
                onChange={handleInputChange}
                placeholder="끝난 시간 (예: 17:00)"
              />
            </div>
            <div>
              <label>장소</label>
              <div>
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
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div>
              <label>거리(km)</label>
              <input
                type="text"
                name="distance"
                value={formData.distance}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>평균 페이스</label>
              <input
                type="text"
                name="averagePace"
                value={formData.averagePace}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>쓰레기 양</label>
              <input
                type="text"
                name="trashAmount"
                value={formData.trashAmount}
                onChange={handleInputChange}
              />
            </div>
            <label>설명</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className={styles.btns}>
          <button className="gBtn" type="submit">
            인증하기
          </button>
          <button
            type="button"
            onClick={() => {
              setIsWriting(false);
            }}
            className={styles.back}
          >
            뒤로가기
          </button>
        </div>
      </form>
    </div>
  );
};

export default Plogging;

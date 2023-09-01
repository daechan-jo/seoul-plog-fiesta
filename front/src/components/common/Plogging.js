import { useEffect, useState } from 'react';
import { seoulDistricts } from './exportData';
import styles from './index.module.scss';
import * as Api from '../../api';
import { errorMessageState, isErrorState } from '../../features/recoilState';
import { useRecoilState } from 'recoil';
import post_none from '../../assets/post_none.png';

const Plogging = ({ setIsWriting }) => {
  const [, setIsError] = useRecoilState(isErrorState);
  const [, setErrorMessage] = useRecoilState(errorMessageState);
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
        certImage: imgContainer,
      });
      return res;
    } catch (err) {
      throw err;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('담긴파일: ', imgContainer);
    try {
      const postRes = await Api.post('/plo/post', formData);
      //id가 필요하기 때문에 반환값을 받아서, 해당 id에 이미지를 업로드
      if (imgContainer) {
        uploadImage(postRes.data.id);
      }
      setIsWriting(false);
      setErrorMessage('인증글이 생성되었습니다.');
      setIsError(true);
    } catch (err) {
      alert('인증 글 업로드 실패', err.response.data.message);
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
        console.log('나의 그룹 리스트 실패', err.response.data.message);
      }
    };

    getData();
  }, []);

  useEffect(() => {
    const fetchGroupMembers = async () => {
      if (formData.groupName) {
        try {
          const res = await Api.get(`/group/members/${formData.groupName}`);
          setGroupMembers(res.data);
        } catch (err) {
          console.log(
            '그룹 멤버 리스트를 가져오는데 실패.',
            err.response.data.message,
          );
        }
      }
    };

    fetchGroupMembers();
  }, [formData.groupName]);

  return (
    <div className="modal">
      <form className={styles.plogging} onSubmit={handleSubmit}>
        <h1>인증하기</h1>{' '}
        <div className="container">
          <div className="img">
            <div className={styles.imgContainer}>
              <img src={post_none} id="proggingPreviewImg" alt="인증이미지" />
            </div>
            <input
              type="file"
              name="file"
              accept=".jpg, .jpeg, .png, .gif"
              onChange={handleImgChange}
            />
            <div>
              <input
                type="checkbox"
                checked={isGroupPost}
                onChange={(e) => {
                  setIsGroupPost(e.target.checked);
                  setFormData((prev) => ({
                    ...prev,
                    isGroupPost: e.target.checked,
                  }));
                }}
              />
              <div>그룹 여부</div>
            </div>
            {isGroupPost && (
              <div>
                <select
                  name="groupName"
                  value={formData.groupName}
                  onChange={(e) => {
                    setFormData((prev) => ({
                      ...prev,
                      groupName: e.target.value,
                    }));
                  }}
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
                  value={formData.participants}
                  onChange={(e) => {
                    const selectedOptions = e.target.selectedOptions;
                    const selectedValues = Array.from(selectedOptions).map(
                      (option) => option.value,
                    );

                    setFormData((prev) => ({
                      ...prev,
                      participants: selectedValues,
                    }));
                  }}
                  multiple
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
                placeholder="제목을 입력해주세요"
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
            <div className={styles.location}>
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
                  placeholder="세부 장소를 입력해주세요"
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
                placeholder="거리 (예: 2km)"
              />
            </div>
            <div>
              <label>평균 속도</label>
              <input
                type="text"
                name="averagePace"
                value={formData.averagePace}
                onChange={handleInputChange}
                placeholder="평균 속도 (예: 1km/h)"
              />
            </div>
            <div>
              <label>쓰레기 양</label>
              <input
                type="text"
                name="trashAmount"
                value={formData.trashAmount}
                onChange={handleInputChange}
                placeholder="쓰레기 양 (예: 500g, 1.5봉투)"
              />
            </div>
            <label>설명</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="추가 정보를 입력해주세요"
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

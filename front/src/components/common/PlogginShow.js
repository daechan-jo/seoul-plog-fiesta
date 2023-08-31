import { useEffect, useState } from 'react';
import { seoulDistricts } from './exportData';
import styles from './index.module.scss';
import * as Api from '../../api';
import { handleCreatedDate } from '../../utils/handleCreatedDate';
import { useSelector } from 'react-redux';
import CommentAdd from './Comment';
import { useNavigate } from 'react-router-dom';
import { handleImgUrl } from '../../utils/handleImgUrl';
import post_none from '../../assets/post_none.png';

const initialData = {
  region: '',
  location: '',
  distance: '',
  trashAmount: '',
  averagePace: '',
  description: '',
  title: '',
  startTime: '',
  endTime: '',
  authorNickname: '',
  isGroupPost: false,
};

const PloggingShow = ({ id, setIsPlogginShowOpen }) => {
  const [isFetching, setIsFetching] = useState(false);
  const [data, setData] = useState(initialData);
  const [isEditing, setIsEditing] = useState(false);
  const [groupData, setGroupData] = useState({
    groupName: '',
    participants: [],
  });
  const [postId, setPostId] = useState(null);
  const [imgContainer, setImgContainer] = useState();
  const [isGroupPost, setIsGroupPost] = useState(false);

  const navigator = useNavigate();
  const user = useSelector((state) => state.user);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const [comments, setComments] = useState([]);

  const handleDelete = async () => {
    try {
      const res = await Api.delete(`/plo/post/${data.id}`);
      console.log(res.data);
      setIsPlogginShowOpen(false);
    } catch (err) {
      console.log('인증글 삭제 실패.', err);
    }
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
          const previewImg = document.getElementById('proggingPostPreviewImg');
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
      console.log('이미지 업로드 에러', err);
      throw err;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isGroupPost) {
      setData((prev) => ({ ...prev, ...groupData, isGroupPost: true }));
    }
    try {
      const postRes = await Api.put(`/plo/post/${data.id}`, {
        title: data.title,
        region: data.region,
        location: data.location,
        distance: data.distance,
        trashAmount: data.trashAmount,
        averagePace: data.averagePace,
        description: data.description,
        startTime: data.startTime,
        endTime: data.endTime,
      });
      if (imgContainer) {
        await uploadImage(postRes.data.id);
      }
      setIsEditing(false);
    } catch (err) {
      alert('인증 글 수정 실패', err);
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        setIsFetching(true);
        const res = await Api.get(`/plo/post/${id}`);
        setData(res.data);
        setComments(res.data.comments);
        setPostId(res.data.id);
      } catch (err) {
        console.log('인증글 데이터를 불러오는데 실패.', err);
      } finally {
        setIsFetching(false);
      }
    };

    getData();
  }, [id]);

  return (
    <div className="modal">
      <form className={styles.show}>
        {isEditing ? (
          <input
            type="text"
            name="title"
            value={data.title}
            onChange={handleInputChange}
          />
        ) : (
          <h1>{data.title}</h1>
        )}
        <div className="container">
          <div className="img">
            <div className={styles.imgContainer}>
              <img
                id="proggingPostPreviewImg"
                src={
                  data.images && data.images.length !== 0
                    ? handleImgUrl(data.images[0])
                    : post_none
                }
                alt="인증이미지"
              />
            </div>
            {isEditing && (
              <input type="file" name="file" onChange={handleImgChange} />
            )}
            {isEditing && (
              <div>
                <input
                  type="checkbox"
                  checked={isGroupPost}
                  onChange={(e) => setIsGroupPost(e.target.checked)}
                />
                <div>그룹 여부 수정</div>
              </div>
            )}
            {isEditing && isGroupPost && (
              <div>
                <div>
                  <label>그룹 이름</label>
                  <input
                    type="text"
                    name="groupName"
                    value={groupData.groupName}
                    onChange={(e) => {
                      setGroupData((prev) => ({
                        ...prev,
                        groupName: e.target.value,
                      }));
                    }}
                    placeholder="그룹 이름"
                  />
                </div>
                <div>
                  <label>참여자</label>
                  <input
                    type="text"
                    name="participants"
                    value={groupData.participants}
                    onChange={(e) => {
                      setGroupData((prev) => ({
                        ...prev,
                        participants: e.target.value,
                      }));
                    }}
                    placeholder="참여자"
                  />
                </div>
              </div>
            )}
            {data.isGroupPost && <div>{data.groupName}</div>}
            {data.isGroupPost && (
              <div>
                {data.participants.map((name) => (
                  <div>{name}</div>
                ))}
              </div>
            )}
          </div>
          <div className={styles.content}>
            <div>
              <label>작성자</label>
              <label>|</label>
              <div>{data.authorNickname}</div>
            </div>
            <div>
              <label>지역구</label>
              <label>|</label>
              {isEditing ? (
                <select
                  name="region"
                  value={data.region}
                  onChange={handleInputChange}
                >
                  <option value="">자치구 선택</option>
                  {Object.keys(seoulDistricts).map((region) => (
                    <option key={region} value={region}>
                      {seoulDistricts[region]}
                    </option>
                  ))}
                </select>
              ) : (
                <div> {seoulDistricts[data.region]}</div>
              )}
            </div>
            <div>
              <label>상세주소</label>
              <label>|</label>
              {isEditing ? (
                <input
                  type="text"
                  name="location"
                  value={data.location}
                  onChange={handleInputChange}
                />
              ) : (
                <div> {data.location}</div>
              )}
            </div>
            <div>
              <label>거리</label>
              <label>|</label>
              {isEditing ? (
                <input
                  type="text"
                  name="distance"
                  value={data.distance}
                  onChange={handleInputChange}
                />
              ) : (
                <div>{data.distance}</div>
              )}
            </div>
            <div>
              <label>쓰레기양</label>
              <label>|</label>
              {isEditing ? (
                <input
                  type="text"
                  name="trashAmount"
                  value={data.trashAmount}
                  onChange={handleInputChange}
                />
              ) : (
                <div>{data.trashAmount}</div>
              )}
            </div>
            <div>
              <label>평균시간</label>
              <label>|</label>
              {isEditing ? (
                <input
                  type="text"
                  name="averagePace"
                  value={data.averagePace}
                  onChange={handleInputChange}
                />
              ) : (
                <div> {data.averagePace}</div>
              )}
            </div>
            <div>
              <label>상세시간</label>
              <label>|</label>
              <div className={styles.time}>
                {isEditing ? (
                  <div>
                    <input
                      type="text"
                      name="averagePace"
                      value={data.startTime}
                      onChange={handleInputChange}
                    />
                    <input
                      type="text"
                      name="averagePace"
                      value={data.endTime}
                      onChange={handleInputChange}
                    />
                  </div>
                ) : (
                  <div>
                    {data.startTime}-{data.endTime}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {comments && (
          <div className={styles.commentList}>
            {comments.length !== 0 &&
              comments
                .slice(0, 5)
                .map((comment, index) => (
                  <CommentItem
                    data={comment}
                    postId={postId}
                    order={index + 1}
                    isReply
                    setComments={setComments}
                  />
                ))}
          </div>
        )}
        <CommentAdd
          id={data.id}
          comments={data.comments}
          setComments={setComments}
        />
        <div>
          {user.loginId === data.writerId &&
            (isEditing ? (
              <>
                <button
                  className="gBtn"
                  type="button"
                  onClick={(e) => {
                    handleSubmit(e);
                    setIsEditing(false);
                  }}
                >
                  수정완료
                </button>
                <button
                  className="gBtn"
                  type="button"
                  onClick={() => {
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
                  type="button"
                  onClick={() => {
                    setIsEditing(true);
                  }}
                >
                  수정하기
                </button>
                <button className="gBtn" type="button" onClick={handleDelete}>
                  삭제하기
                </button>
              </>
            ))}
          {user.loginId !== data.writerId && (
            <button
              className="gBtn"
              type="button"
              onClick={() => {
                navigator(`/users/${data.writerId}`);
              }}
            >
              작성자 보러가기
            </button>
          )}
          <button
            type="button"
            className="gBtn"
            onClick={() => {
              setIsPlogginShowOpen(false);
            }}
          >
            뒤로가기
          </button>
        </div>
      </form>
    </div>
  );
};

export default PloggingShow;

const CommentItem = ({ data, order, setComments, postId, isReply }) => {
  const [commentTwo, setCommentTow] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [sendData, setSendData] = useState(data.content);
  const user = useSelector((state) => state.user);

  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      await Api.delete(`/comment/${data.id}`);
      setComments((prev) => prev.filter((comment) => comment.id !== data.id));
    } catch (err) {
      console.log('댓글글 삭제 실패.', err);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    try {
      await Api.put(`/comment/${data.id}`, { content: sendData });
      setIsEditing(false);
    } catch (err) {
      console.log('댓글 수정 실패.', err);
    }
  };

  return (
    <>
      {!isReply && 'L'}
      <div className={styles.commentItem}>
        <div>{data.id}</div>
        <div className={styles.commentItemContent}>
          {data.parentId != null && <span>@{data.parentId}</span>}
          {isEditing ? (
            <input
              type="text"
              required
              name="content"
              value={sendData}
              onChange={(e) => {
                setSendData(e.target.value);
              }}
            />
          ) : (
            sendData
          )}
        </div>
        <div>{data.commenterNickname}</div>
        <div>{handleCreatedDate(data.createdAt)}</div>
        <div className={styles.btns}>
          {user.loginId === data.writerId && (
            <>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setCommentTow(!commentTwo);
                }}
              >
                추가
              </button>
              {isEditing ? (
                <button onClick={handleEditSubmit}>완료</button>
              ) : (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setIsEditing(true);
                  }}
                >
                  편집
                </button>
              )}
            </>
          )}
          <button onClick={handleDelete}>삭제</button>
        </div>
      </div>
      {/* 태그형식으로 보관이라 사용 불가능 */}
      {data.comments && (
        <div className={styles.commentList}>
          {data.comments.length !== 0 &&
            data.comments.map((data, index) => (
              <CommentItem data={data} order={index + 1} isReply="false" />
            ))}
        </div>
      )}
      {commentTwo && (
        <CommentAdd
          id={data.id}
          postId={postId}
          isComment={true}
          setCommentTow={setCommentTow}
          setComments={setComments}
        />
      )}
    </>
  );
};

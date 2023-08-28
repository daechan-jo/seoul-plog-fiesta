import { useEffect, useState } from 'react';
import { seoulDistricts } from './exportData';
import styles from './index.module.scss';
import * as Api from '../../api';
import { handleCreatedDate } from '../../utils/handleCreatedDate';

const PloggingShow = ({ id, setIsPlogginShowOpen }) => {
  const [isFetching, setIsFetching] = useState(false);
  const [data, setData] = useState({});

  useEffect(() => {
    const getData = async () => {
      try {
        setIsFetching(true);
        const res = await Api.get(`/plo/post/${id}`);
        setData(res.data);
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
        <h1>{data.title}</h1>
        <div className="container">
          <div className="img">
            <div className={styles.imgContainer}>
              <img src={data.images} alt="인증이미지" />
            </div>
          </div>
          <div className={styles.content}>
            <div>
              <label>작성자</label>
              <label>|</label>
              {data.writerId}
            </div>
            <div>
              <label>지역구</label>
              <label>|</label>
              {data.region}
            </div>
            <div>
              <label>상세주소</label>
              <label>|</label>
              {data.location}
            </div>
            <div>
              <label>거리</label>
              <label>|</label>
              {data.distance}
            </div>
            <div>
              <label>쓰레기양</label>
              <label>|</label>
              {data.trashAmount}
            </div>
            <div>
              <label>평균속도</label>
              <label>|</label>
              {data.averagePace}
            </div>
            <div>
              <label>상세시간</label>
              <label>|</label>
              <div className={styles.time}>
                <div>{handleCreatedDate(data.createdAt)}</div>
                <div>
                  {data.startTime}-{data.endTime}
                </div>
              </div>
            </div>

            {data.isGroupPost && <div>{data.groupName}</div>}
          </div>
        </div>
        {data.comments && (
          <div className={styles.commentList}>
            {data.comments.length !== 0 &&
              data.comments.map((data) => <CommentItem data={data} />)}
          </div>
        )}
        <div>
          <button className="gBtn" onClick={() => {}}>
            댓글작성하기
          </button>
          <button
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

const CommentItem = ({ data }) => {
  return (
    <div className={styles.commentItem}>
      <div>{data.content}</div>
      <div>{handleCreatedDate(data.createdAt)}</div>
    </div>
  );
};

const CommentAdd = ({ setIsCommentAddOpen }) => {
  return (
    <div>
      <div>
        <button className="gBtn">댓글추가</button>
      </div>
    </div>
  );
};

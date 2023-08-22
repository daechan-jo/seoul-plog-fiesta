import { useState } from 'react';
import styles from './index.module.scss';
import * as Api from '../../api';
import { useRecoilState } from 'recoil';
import { errorMessageState, isErrorState } from '../../features/recoilState';
import { useNavigate } from 'react-router-dom';

const Writing = ({ setIsModal, id }) => {
  const [isError, setIsError] = useRecoilState(isErrorState);
  const [errorMessage, setErrorMessage] = useRecoilState(errorMessageState);
  const navigator = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    isNotice: false,
  });

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;

    if (type === 'checkbox') {
      setFormData((prevData) => ({
        ...prevData,
        [name]: checked,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await Api.post(`/group/post/${id}`, formData);
      setIsError(true);
      navigator('/groups/1?view=notice');
      setErrorMessage('그룹 글을 생성했습니다.');
      setIsModal(false);
    } catch (err) {
      console.log('그룹 글생성 실패.', err);
    }
  };

  return (
    <div className="modal">
      <form className={styles.plogging} onSubmit={handleSubmit}>
        <h1>게시글 작성하기</h1>
        <div className="container">
          <div className={styles.content}>
            <label>제목</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
            />
            <div className={styles.check}>
              <input
                type="checkbox"
                name="isNotice"
                checked={formData.isNotice}
                onChange={handleInputChange}
              />
              <span>공지사항으로 하기</span>
            </div>
            <label>설명</label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className={styles.btns}>
          <button className="gBtn" type="submit">
            작성하기
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
        </div>
      </form>
    </div>
  );
};

export default Writing;

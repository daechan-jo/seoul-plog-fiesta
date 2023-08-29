import { useState } from 'react';
import * as Api from '../../api';
import styles from './index.module.scss';

const CommentAdd = ({ id, isCert, comments }) => {
  const [data, setData] = useState();
  const handleClick = async (e) => {
    e.preventDefault();

    try {
      const res = await Api.post(
        `/comment/${id}${isCert ? '' : '&cert=true'}`,
        { content: data },
      );
      if (res.data === '게시글을 찾을 수 없') {
        alert('잘못된 접근입니다.');
        return;
      }
      alert('댓글 작성 성공');
      comments.push(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.commentAdd}>
      <textarea
        type="text"
        value={data}
        onChange={(e) => {
          setData(e.target.value);
        }}
      />
      <button className="gBtn" onClick={handleClick}>
        +
      </button>
    </div>
  );
};

export default CommentAdd;

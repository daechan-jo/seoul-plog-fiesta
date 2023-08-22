import React from 'react';
import styles from './index.module.scss';
import { useNavigate, useParams } from 'react-router-dom';

//const lists = { group: 'GROUP', user: 'USER' };

const PageNav = ({ params, view, lists, setView }) => {
  const navigator = useNavigate();
  const listKeys = Object.keys(lists);

  return (
    <div className={styles.pageNav}>
      {listKeys.map((list) => (
        <button
          className={`${
            !view && list === 'main'
              ? styles.activeNav
              : list === view
              ? styles.activeNav
              : ''
          }`}
          onClick={() => {
            setView(list);
            navigator(`/${params}?view=${list}`);
          }}
        >
          {lists[list]}
        </button>
      ))}
    </div>
  );
};

export default PageNav;

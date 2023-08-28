import React from 'react';
import styles from './index.module.scss';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

//const lists = { group: 'GROUP', user: 'USER' };

const PageNav = ({ params, view, lists, setView }) => {
  const navigator = useNavigate();
  const listKeys = Object.keys(lists);

  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);

  const adminValue = searchParams.get('admin');

  return (
    <div className={styles.pageNav}>
      {listKeys.map((list) => (
        <button
          key={list}
          className={`${
            !view && list === 'main'
              ? styles.activeNav
              : list === view
              ? styles.activeNav
              : ''
          }`}
          onClick={() => {
            setView(list);
            if (adminValue) {
              navigator(`/${params}?admin=${adminValue}&view=${list}`);
            } else {
              navigator(`/${params}?&view=${list}`);
            }
          }}
        >
          {lists[list]}
        </button>
      ))}
    </div>
  );
};

export default PageNav;

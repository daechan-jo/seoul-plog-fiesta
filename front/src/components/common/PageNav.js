import React from 'react';
import styles from './index.module.scss';

//const lists = { group: 'GROUP', user: 'USER' };

const PageNav = ({ view, lists, setView }) => {
  const listKeys = Object.keys(lists);

  return (
    <div className={styles.pageNav}>
      {listKeys.map((list) => (
        <button
          className={`${list === view ? styles.activeNav : ''}`}
          onClick={() => {
            setView(list);
          }}
        >
          {lists[list]}
        </button>
      ))}
    </div>
  );
};

export default React.memo(PageNav);

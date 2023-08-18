import styles from './index.module.scss';

// state값에
const PageNav = ({ lists, onViewChange }) => {
  return (
    <div className={styles.pageNav}>
      {lists.map((list) => (
        <button
          onClick={() => {
            onViewChange(list);
          }}
        >
          {list}
        </button>
      ))}
    </div>
  );
};

export default PageNav;

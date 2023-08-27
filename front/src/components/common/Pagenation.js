import styles from './index.module.scss';

const Pagination = ({ totalPages, currentPage, handlePage }) => {
  currentPage = Number(currentPage);
  function handleLeftClick() {
    handlePage(currentPage - 1);
  }

  function handleRightClick() {
    handlePage(currentPage + 1);
  }

  const renderPageNumbers = () => {
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <li
          key={i}
          className={currentPage === i ? styles.active : ''}
          onClick={() => {
            handlePage(i);
          }}
        >
          {i}
        </li>,
      );
    }

    return pageNumbers;
  };

  return (
    <div className={styles.pagenation}>
      <ul>
        <li
          className={currentPage === 1 ? styles.disabled : ''}
          onClick={currentPage === 1 ? null : handleLeftClick}
        >
          &lt;
        </li>

        {/* 페이지 번호 */}
        {renderPageNumbers()}

        <li
          className={currentPage === totalPages ? styles.disabled : ''}
          onClick={currentPage === totalPages ? null : handleRightClick}
        >
          &gt;
        </li>
      </ul>
    </div>
  );
};

export default Pagination;

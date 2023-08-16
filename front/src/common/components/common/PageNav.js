import styles from './index.module.scss';

// state값에
const PageNav = ({lists, setLists}) => {
  return(<div className={styles.pageNav}>
    {lists.map(list => <button onClick={setLists}>{list}</button>)}
  </div>)
}

export default PageNav;
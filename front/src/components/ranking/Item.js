import styles from './index.module.scss';

const Item = ({ data }) => {
  //{ id: '1', name: '모임이름1', score: 100 },
  const { id, name, score } = data;

  return (
    <ul className={styles.item}>
      <li key={id}>{id}</li>
      <li key={name}>{name}</li>
      <li key={score}>{score}</li>
    </ul>
  );
};

export default Item;

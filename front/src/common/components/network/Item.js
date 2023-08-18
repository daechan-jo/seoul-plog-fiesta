import styles from './index.module.scss';

const Item = ({ data }) => {
  //{ id: '1', name: '그룹이름1', region: 'gwangin' }
  const { id, name, region } = data;

  return (
    <ul className={styles.item}>
      <li key={id}>{id}</li>
      <li key={name}>{name}</li>
      <li key={region}>{region}</li>
    </ul>
  );
};

export default Item;

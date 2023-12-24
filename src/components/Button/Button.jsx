import css from '../Services/styles.module.css';
const Button = ({ handleLoadMore }) => {
  return (
    <button className={css.Button} type="button" onClick={handleLoadMore}>
      Load more
    </button>
  );
};

export { Button };

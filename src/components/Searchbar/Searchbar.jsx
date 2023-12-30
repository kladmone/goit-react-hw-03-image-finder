import Icon from 'components/Services/Icon';
import css from './Searchbar.module.css';

const Searchbar = ({ onSubmit }) => {
  return (
    <div>
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={onSubmit}>
          <button type="submit" className={css.SearchFormButton}>
            <Icon className={css.searchIcon} />
            <span className={css.SearchFormButtonLabel}>Search</span>
          </button>
          <input
            className={css.SearchFormInput}
            type="text"
            name="searchInput"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            required
          />
        </form>
      </header>
    </div>
  );
};

export { Searchbar };

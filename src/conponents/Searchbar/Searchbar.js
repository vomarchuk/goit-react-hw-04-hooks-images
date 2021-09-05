import PropTypes from 'prop-types';

import { useState } from 'react';
import { toast } from 'react-toastify';

import s from './Searchbar.module.css';

export default function Searchbar({ onSubmit }) {
  const [searchValue, setSearchValue] = useState('');
  const hundleChange = event => {
    event.preventDefault();
    setSearchValue(event.currentTarget.value);
  };

  const hundleSubmit = event => {
    event.preventDefault();
    if (searchValue.trim() === '') {
      return toast.error('Enter the names of the pictures');
    }
    onSubmit(searchValue);
    setSearchValue('');
  };

  return (
    <header className={s.searchbar}>
      <form onSubmit={hundleSubmit} className={s.searchForm}>
        <button type="submit" className={s.searchForm_button}>
          <span className={s.searchForm_button_label}>Search</span>
        </button>

        <input
          className={s.searchForm_input}
          type="text"
          value={searchValue}
          onChange={hundleChange}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  Searchbar: PropTypes.func,
};

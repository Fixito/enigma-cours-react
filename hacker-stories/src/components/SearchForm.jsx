import { useContext } from 'react';

import { AppContext } from '../Context.jsx';

export default function SearchForm() {
  const { searchTerm, onInputChange, onSearch } = useContext(AppContext);

  const handleChange = (e) => {
    onInputChange(e);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!searchTerm) return;
    onSearch(searchTerm);
  };

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor='search'>Search: </label>
      <input
        type='search'
        name='search'
        id='search'
        value={searchTerm}
        onChange={handleChange}
      />
      <button disabled={!searchTerm}>Search</button>
    </form>
  );
}

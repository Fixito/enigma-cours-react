import { useState } from 'react';

import CocktailList from '../components/CocktailList.jsx';
import SearchForm from '../components/SearchForm.jsx';

import { useFetch } from '../hooks/useFetch.js';

const URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=%25';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const { data, isLoading, isError } = useFetch(URL + searchTerm);

  const handleSearchInput = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <SearchForm searchTerm={searchTerm} onSearchInput={handleSearchInput} />
      <CocktailList
        cocktails={data.drinks}
        isError={isError}
        isLoading={isLoading}
      />
    </>
  );
}

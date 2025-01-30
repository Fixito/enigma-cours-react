import { useContext } from 'react';

import { AppContext } from '../Context.jsx';

export default function LastSearches() {
  const { lastSearches, onLastSearch } = useContext(AppContext);

  return (
    <div>
      {lastSearches.map((searchTerm, index) => {
        return (
          <button key={index} onClick={() => onLastSearch(searchTerm)}>
            {searchTerm}
          </button>
        );
      })}
    </div>
  );
}

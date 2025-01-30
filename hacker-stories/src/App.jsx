import { useContext } from 'react';

import { AppContext } from './Context.jsx';

import LastSearches from './components/LastSearches.jsx';
import List from './components/List.jsx';
import SearchForm from './components/SearchForm.jsx';

export default function App() {
  const { stories } = useContext(AppContext);

  return (
    <main>
      <h1>My Hacker Stories</h1>

      <SearchForm />

      <LastSearches />

      <hr />

      {stories.isLoading ? (
        <div>Loading...</div>
      ) : !stories.isError ? (
        stories.data.length > 0 ? (
          <List />
        ) : (
          <h2>No data found</h2>
        )
      ) : (
        <h2>Something went wrong</h2>
      )}
    </main>
  );
}

import {
  createContext,
  useCallback,
  useEffect,
  useReducer,
  useState,
} from 'react';

import axios from 'axios';

import {
  REMOVE_STORY,
  STORIES_FETCH_FAILURE,
  STORIES_FETCH_INIT,
  STORIES_FETCH_SUCCESS,
} from './actions.js';

import { initialState, storiesReducer } from './storiesReducer.js';

import { getUrl, getLastSearches, SORTS } from './libs/utils.js';

// eslint-disable-next-line react-refresh/only-export-components
export const AppContext = createContext();

export default function Context({ children }) {
  const [searchTerm, setSearchTerm] = useState(
    localStorage.getItem('search') || 'react'
  );
  const [sort, setSort] = useState({
    sortKey: 'NONE',
    isReverse: false,
  });
  const [stories, dispatchStories] = useReducer(storiesReducer, initialState);
  const [urls, setUrls] = useState([getUrl(searchTerm)]);

  const lastSearches = getLastSearches(urls);

  const sortFunction = SORTS[sort.sortKey];
  const sortedStories = sort.isReverse
    ? sortFunction(stories.data).reverse()
    : sortFunction(stories.data);

  const fetchData = useCallback(async () => {
    dispatchStories({ type: STORIES_FETCH_INIT });

    try {
      const lasUrl = urls.at(-1);
      const { data } = await axios(lasUrl);
      dispatchStories({
        type: STORIES_FETCH_SUCCESS,
        payload: data.hits,
      });
    } catch {
      dispatchStories({ type: STORIES_FETCH_FAILURE });
    }
  }, [urls]);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = (searchTerm) => {
    const url = getUrl(searchTerm);
    setUrls([...urls, url]);
  };

  const handleLastSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
    handleSearch(searchTerm);
  };

  const handleSort = (sortKey) => {
    const isReverse = sort.sortKey === sortKey && !sort.isReverse;
    setSort({ sortKey, isReverse });
  };

  const handleRemoveItem = (id) => {
    dispatchStories({ type: REMOVE_STORY, payload: id });
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    localStorage.setItem('search', searchTerm);
  }, [searchTerm]);

  return (
    <AppContext.Provider
      value={{
        lastSearches,
        stories,
        sortedStories,
        searchTerm,
        sort,
        onInputChange: handleInputChange,
        onLastSearch: handleLastSearch,
        onRemoveItem: handleRemoveItem,
        onSearch: handleSearch,
        onSort: handleSort,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

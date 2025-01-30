import { sortBy } from 'lodash';

import { API_ENDPOINT } from './constants.js';

export const SORTS = {
  NONE: (list) => list,
  TITLE: (list) => sortBy(list, 'title'),
  AUTHOR: (list) => sortBy(list, 'author'),
  COMMENT: (list) => sortBy(list, 'num_comments').reverse(),
  POINT: (list) => sortBy(list, 'points').reverse(),
};

export function extractSearchTerm(url) {
  return url.replace(API_ENDPOINT, '');
}

export function getLastSearches(urls) {
  return [
    ...new Set(
      sortBy(
        urls
          .reduce((result, url, index) => {
            const searchTerm = extractSearchTerm(url);

            if (index === 0) {
              return [...result, searchTerm];
            }

            const previousSearchTerm = result.at(-1);

            if (searchTerm === previousSearchTerm) {
              return result;
            }

            return [...result, searchTerm];
          }, [])
          .slice(-6)
          .slice(0, -1)
          .filter((searchTerm) => searchTerm.trim()),
        (s) => s
      )
    ),
  ];
}

export function getUrl(searchTerm) {
  return API_ENDPOINT + searchTerm;
}

import { useContext } from 'react';

import { AppContext } from '../Context.jsx';

import TableHeader from './TableHeader.jsx';

export default function List() {
  const { sort, sortedStories, onSort } = useContext(AppContext);

  return (
    <table>
      <thead>
        <tr>
          <TableHeader
            header='Title'
            onClick={() => onSort('TITLE')}
            isActive={sort.sortKey === 'TITLE'}
            isReverse={sort.sortKey === 'TITLE' && !sort.isReverse}
          />
          <TableHeader
            header='Author'
            onClick={() => onSort('AUTHOR')}
            isActive={sort.sortKey === 'AUTHOR'}
            isReverse={sort.sortKey === 'AUTHOR' && !sort.isReverse}
          />
          <TableHeader
            header='Comments'
            onClick={() => onSort('COMMENT')}
            isActive={sort.sortKey === 'COMMENT'}
            isReverse={sort.sortKey === 'COMMENT' && sort.isReverse}
          />
          <TableHeader
            header='Points'
            onClick={() => onSort('POINT')}
            isActive={sort.sortKey === 'POINT'}
            isReverse={sort.sortKey === 'POINT' && sort.isReverse}
          />
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {sortedStories.map((item) => (
          <Item key={item.objectID} {...item} />
        ))}
      </tbody>
    </table>
  );
}

export function Item({ objectID, title, url, author, num_comments, points }) {
  const { onRemoveItem } = useContext(AppContext);

  return (
    <tr>
      <td>
        <a href={url}>{title}</a>
      </td>
      <td>{author}</td>
      <td>{num_comments}</td>
      <td>{points}</td>
      <td>
        <button onClick={() => onRemoveItem(objectID)}>Delete</button>
      </td>
    </tr>
  );
}

import { render, screen } from '@testing-library/react';

import { AppContext } from '../Context.jsx';
import List from '../components/List.jsx';

import { stories } from './testData.js';

const onSort = vi.fn();
const sort = vi.fn();

describe('List component', () => {
  it('should render a list of items', () => {
    render(
      <AppContext.Provider value={{ sortedStories: stories, sort, onSort }}>
        <List />
      </AppContext.Provider>
    );

    expect(screen.getByRole('table')).toBeInTheDocument();
    expect(screen.getAllByRole('row')).toHaveLength(stories.length + 1);
    expect(screen.getAllByRole('button', { name: /delete/i })).toHaveLength(
      stories.length
    );
  });
});

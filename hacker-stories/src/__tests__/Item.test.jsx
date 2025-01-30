import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Item } from '../components/List.jsx';
import Context, { AppContext } from '../Context.jsx';

import { storyOne } from './testData.js';

describe('Item component', () => {
  it('should render all properties correctly', () => {
    render(
      <Context>
        <Item {...storyOne} />
      </Context>
    );

    expect(screen.getByText(/jordan walke/i)).toBeInTheDocument();
    expect(screen.getByText(/react/i)).toHaveAttribute('href', storyOne.url);
  });

  it('should call the callback handler when clicking the delete button', async () => {
    const user = userEvent.setup();
    const handleRemoveItem = vi.fn();

    render(
      <AppContext.Provider value={{ onRemoveItem: handleRemoveItem }}>
        <Item {...storyOne} />
      </AppContext.Provider>
    );

    const btn = screen.getByRole('button', { name: /delete/i });

    expect(btn).toBeInTheDocument();

    await user.click(btn);

    expect(handleRemoveItem).toHaveBeenCalledOnce();
    expect(handleRemoveItem).toHaveBeenCalledWith(storyOne.objectID);
  });
});

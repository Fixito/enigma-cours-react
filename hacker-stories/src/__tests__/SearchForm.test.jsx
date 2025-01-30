import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Context, { AppContext } from '../Context.jsx';
import SearchForm from '../components/SearchForm.jsx';

describe('SearchForm component', () => {
  const searchValues = {
    searchTerm: 'react',
    onInputChange: vi.fn(),
    onSearch: vi.fn(),
  };
  let user = null;

  beforeEach(() => {
    searchValues.onInputChange.mockClear();
    searchValues.onSearch.mockClear();
    user = userEvent.setup();
    localStorage.clear();
  });

  it('should render the correct label', () => {
    render(
      <Context>
        <SearchForm />
      </Context>
    );

    expect(screen.getByLabelText(/search/i)).toBeInTheDocument();
  });

  it('should initialize with default value "react" when no localStorage value exists', () => {
    render(
      <Context>
        <SearchForm />
      </Context>
    );

    expect(screen.getByDisplayValue(/react/i)).toBeInTheDocument();
  });

  it('should initialize with localStorage value when it exists', () => {
    localStorage.setItem('search', 'redux');
    render(
      <Context>
        <SearchForm />
      </Context>
    );

    expect(screen.getByDisplayValue(/redux/i)).toBeInTheDocument();
  });

  it('should call onInputChange on input field change', async () => {
    render(
      <AppContext.Provider value={searchValues}>
        <SearchForm />
      </AppContext.Provider>
    );

    const input = screen.getByRole('searchbox', { name: /search/i });
    await user.type(input, 'redux');

    expect(searchValues.onInputChange).toHaveBeenCalledTimes(5);
  });

  it('should call onSearch on form button submit', async () => {
    render(
      <AppContext.Provider value={searchValues}>
        <SearchForm />
      </AppContext.Provider>
    );

    const btn = screen.getByRole('button', { name: /search/i });

    expect(btn).not.toBeDisabled();

    await user.click(btn);

    expect(searchValues.onSearch).toHaveBeenCalledOnce();
  });

  it('should not call onSearch on form button submit when search term is empty', async () => {
    render(
      <AppContext.Provider value={{ ...searchValues, searchTerm: '' }}>
        <SearchForm />
      </AppContext.Provider>
    );

    const btn = screen.getByRole('button', { name: /search/i });

    expect(btn).toBeDisabled();

    await user.click(btn);

    expect(searchValues.onSearch).not.toHaveBeenCalled();
  });
});

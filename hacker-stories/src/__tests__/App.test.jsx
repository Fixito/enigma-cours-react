import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import axios from 'axios';

import App from '../App.jsx';
import Context from '../Context.jsx';

import { stories, storyOne, storyTwo } from './testData.js';

vi.mock('axios');

const renderApp = async (mockResponse) => {
  axios.mockResolvedValue(mockResponse);
  render(
    <Context>
      <App />
    </Context>
  );
  await waitFor(() => expect(axios).toHaveBeenCalled());
};

describe('App', () => {
  let user = null;

  beforeEach(() => {
    user = userEvent.setup();
  });

  it('should succeed fetching data', async () => {
    await renderApp({ data: { hits: stories } });

    expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    expect(screen.getByRole('table')).toBeInTheDocument();
    expect(screen.getAllByRole('row')).toHaveLength(stories.length + 1);
    expect(screen.getAllByRole('button', { name: /delete/i })).toHaveLength(
      stories.length
    );
    expect(screen.getByText(storyOne.title)).toBeInTheDocument();
    expect(screen.getByText(storyTwo.title)).toBeInTheDocument();
  });

  it('should fail fetching data', async () => {
    axios.mockRejectedValue(new Error());

    render(
      <Context>
        <App />
      </Context>
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    await waitFor(() => expect(axios).toHaveBeenCalled());

    expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /went wrong/i })
    ).toBeInTheDocument();
  });

  it('should remove a story when clicking the delete button', async () => {
    await renderApp({ data: { hits: stories } });

    const btns = screen.getAllByRole('button', { name: /delete/i });

    expect(btns).toHaveLength(stories.length);
    expect(screen.getByText(storyOne.author)).toBeInTheDocument();
    expect(screen.getByText(storyTwo.author)).toBeInTheDocument();

    await user.click(btns[0]);

    expect(screen.getAllByRole('button', { name: /delete/i })).toHaveLength(
      stories.length - 1
    );
    expect(screen.queryByText(storyOne.author)).not.toBeInTheDocument();
  });

  it('should search for specific stories', async () => {
    const anotherStory = {
      objectID: 3,
      title: 'JavaScript',
      url: 'https://en.wikipedia.org/wiki/JavaScript',
      author: 'Brendan Eich',
      num_comments: 15,
      points: 10,
    };
    await renderApp({ data: { hits: stories } });

    const input = screen.getByRole('searchbox', { name: /search/i });
    const btn = screen.getByRole('button', { name: /search/i });

    expect(screen.getByDisplayValue(/react/i)).toBeInTheDocument();
    expect(screen.queryByDisplayValue(/javascript/i)).not.toBeInTheDocument();
    expect(screen.getByText(storyOne.author)).toBeInTheDocument();
    expect(screen.getByText(storyTwo.author)).toBeInTheDocument();
    expect(screen.queryByText(anotherStory.author)).not.toBeInTheDocument();

    axios.mockResolvedValue({ data: { hits: [anotherStory] } });

    await user.clear(input);
    await user.type(input, 'javascript');

    expect(screen.queryByDisplayValue(/react/i)).not.toBeInTheDocument();
    expect(screen.getByDisplayValue(/javascript/i)).toBeInTheDocument();

    await user.click(btn);

    expect(screen.queryByText(storyOne.author)).not.toBeInTheDocument();
    expect(screen.queryByText(storyTwo.author)).not.toBeInTheDocument();
    expect(screen.getByText(anotherStory.author)).toBeInTheDocument();
  });
});

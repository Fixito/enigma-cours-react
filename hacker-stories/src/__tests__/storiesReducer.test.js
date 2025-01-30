import {
  REMOVE_STORY,
  STORIES_FETCH_FAILURE,
  STORIES_FETCH_INIT,
  STORIES_FETCH_SUCCESS,
} from '../actions.js';
import { storiesReducer, initialState } from '../storiesReducer.js';

import { stories, storyOne, storyTwo } from './testData.js';

// TEST UNITAIRE
describe('storiesReducer', () => {
  it('should remove a story from all stories', () => {
    const action = { type: REMOVE_STORY, payload: storyTwo.objectID };
    const state = { data: stories, isError: false, isLoading: false };

    const newState = storiesReducer(state, action);

    const expectedState = {
      data: [storyOne],
      isError: false,
      isLoading: false,
    };

    expect(newState).toStrictEqual(expectedState);
  });

  it('should initialize fetching stories', () => {
    const action = { type: STORIES_FETCH_INIT };
    const state = { data: [], isError: false, isLoading: false };

    const newState = storiesReducer(state, action);

    const expectedState = {
      data: [],
      isError: false,
      isLoading: true,
    };

    expect(newState).toStrictEqual(expectedState);
  });

  it('should handle fetching stories successfully', () => {
    const action = { type: STORIES_FETCH_SUCCESS, payload: stories };
    const state = { data: [], isError: false, isLoading: true };

    const newState = storiesReducer(state, action);

    const expectedState = {
      data: stories,
      isError: false,
      isLoading: false,
    };

    expect(newState).toStrictEqual(expectedState);
  });

  it('should handle fetching stories failure', () => {
    const action = { type: STORIES_FETCH_FAILURE };
    const state = { data: [], isError: false, isLoading: true };

    const newState = storiesReducer(state, action);

    const expectedState = {
      data: [],
      isError: true,
      isLoading: false,
    };

    expect(newState).toStrictEqual(expectedState);
  });

  it('should throw an error for an unknown action type', () => {
    const action = { type: 'UNKNOWN_ACTION' };
    const state = initialState;

    expect(() => storiesReducer(state, action)).toThrowError(
      `No action matching ${action.type}`
    );
  });
});

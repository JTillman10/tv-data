import { SearchReducer } from './search.reducer';
import {
  SEARCH_SUCCESS,
  RESET_RESULTS,
  HIGHLIGHT_ITEM,
  HIGHLIGHT_ITEM_DOWN,
  HIGHLIGHT_ITEM_UP,
  GET_POPULAR_SHOWS
} from './search.actions';

describe('SearchReducer', () => {
  let reducer;
  const initialState = {
    searchResults: [],
    highlightedItem: null,
    dashboardItems: []
  };

  beforeEach(() => {
    reducer = SearchReducer;
  });

  it('exists', () => {
    expect(reducer).toBeTruthy();
  });

  it('should return the initial state', () => {
    const result = reducer(undefined, {});
    expect(result).toEqual(initialState);
  });

  it('should handle SEARCH_SUCCESS', () => {
    const searchResults = 'searchResults';
    const result = reducer(initialState, { type: SEARCH_SUCCESS, searchResults });
    expect(result).toEqual({
      searchResults,
      highlightedItem: null,
      dashboardItems: []
    });
  });

  it('should handle GET_POPULAR_SHOWS', () => {
    const dashboardItems = 'dashboardItems';
    const result = reducer(initialState, { type: GET_POPULAR_SHOWS, results: dashboardItems });
    expect(result).toEqual({
      searchResults: [],
      highlightedItem: null,
      dashboardItems
    });
  });

  it('should handle RESET_RESULTS', () => {
    const state = {
      searchResults: 'searchResults',
      highlightedItem: null,
      dashboardItems: []
    };
    const result = reducer(state, { type: RESET_RESULTS });
    expect(result).toEqual({
      searchResults: [],
      highlightedItem: null,
      dashboardItems: []
    });
  });

  it('should handle HIGHLIGHT_ITEM', () => {
    const highlightedItem = 10;
    const result = reducer(initialState, { type: HIGHLIGHT_ITEM, highlightedItem });
    expect(result).toEqual({
      searchResults: [],
      highlightedItem,
      dashboardItems: []
    });
  });

  describe('HIGHLIGHT_ITEM_DOWN', () => {
    const state = {
      searchResults: new Array(5),
      highlightedItem: null,
      dashboardItems: []
    };

    it('should handle when highlightedItem is null', () => {
      const result = reducer(state, { type: HIGHLIGHT_ITEM_DOWN });
      expect(result).toEqual({
        searchResults: new Array(5),
        highlightedItem: 0,
        dashboardItems: []
      });
    });

    it('should handle when highlightedItem + 1 is greater than searchResults.length', () => {
      state.highlightedItem = 5;
      const result = reducer(state, { type: HIGHLIGHT_ITEM_DOWN });
      expect(result).toEqual({
        searchResults: new Array(5),
        highlightedItem: 0,
        dashboardItems: []
      });
    });

    it('should handle when highlightedItem + 1 is not greater than searchResults.length', () => {
      state.highlightedItem = 3;
      const result = reducer(state, { type: HIGHLIGHT_ITEM_DOWN });
      expect(result).toEqual({
        searchResults: new Array(5),
        highlightedItem: 4,
        dashboardItems: []
      });
    });
  });

  describe('HIGHLIGHT_ITEM_UP', () => {
    const state = {
      searchResults: new Array(5),
      highlightedItem: null,
      dashboardItems: []
    };

    it('should handle when highlightedItem is null', () => {
      const result = reducer(state, { type: HIGHLIGHT_ITEM_UP });
      expect(result).toEqual({
        searchResults: new Array(5),
        highlightedItem: 4,
        dashboardItems: []
      });
    });

    it('should handle when highlightedItem - 1 is greater than searchResults.length', () => {
      const result = reducer(state, { type: HIGHLIGHT_ITEM_UP });
      expect(result).toEqual({
        searchResults: new Array(5),
        highlightedItem: 4,
        dashboardItems: []
      });
    });

    it('should handle when highlightedItem - 1 is not greater than searchResults.length', () => {
      state.highlightedItem = 3;
      const result = reducer(state, { type: HIGHLIGHT_ITEM_UP });
      expect(result).toEqual({
        searchResults: new Array(5),
        highlightedItem: 2,
        dashboardItems: []
      });
    });
  });
});

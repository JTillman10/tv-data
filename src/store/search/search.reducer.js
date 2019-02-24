import {
  SEARCH_SUCCESS,
  RESET_RESULTS,
  HIGHLIGHT_ITEM,
  HIGHLIGHT_ITEM_DOWN,
  HIGHLIGHT_ITEM_UP
} from './search.actions';

const initialState = {
  searchResults: [],
  highlightedItem: null
};

const searchSuccess = (state, action) => {
  return {
    ...state,
    searchResults: action.searchResults
  };
};

const resetResults = state => {
  return {
    ...state,
    searchResults: []
  };
};

const highlightItem = (state, action) => {
  return {
    ...state,
    highlightedItem: action.highlightedItem
  };
};

const highlightItemDown = state => {
  return {
    ...state,
    highlightedItem: state.highlightedItem + 1
  };
};

const highlightItemUp = state => {
  return {
    ...state,
    highlightedItem: state.highlightedItem - 1
  };
};

export const SearchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_SUCCESS:
      return searchSuccess(state, action);
    case RESET_RESULTS:
      return resetResults(state);
    case HIGHLIGHT_ITEM:
      return highlightItem(state, action);
    case HIGHLIGHT_ITEM_DOWN:
      return highlightItemDown(state, action);
    case HIGHLIGHT_ITEM_UP:
      return highlightItemUp(state, action);
    default:
      return state;
  }
};

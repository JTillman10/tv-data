import {
  SEARCH_SUCCESS,
  FILTER_DASHBOARD,
  RESET_RESULTS,
  HIGHLIGHT_ITEM,
  HIGHLIGHT_ITEM_DOWN,
  HIGHLIGHT_ITEM_UP
} from './search.actions';

const initialState = {
  searchResults: [],
  highlightedItem: null,
  dashboardFilter: 'popular',
  dashboardItems: []
};

const searchSuccess = (state, action) => {
  return {
    ...state,
    searchResults: action.searchResults
  };
};

const filterDashboard = (state, action) => {
  return {
    ...state,
    dashboardFilter: action.filterType,
    dashboardItems: action.results
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
  let newHighlightedItem;

  if (state.highlightedItem === null) {
    newHighlightedItem = 0;
  } else if (state.highlightedItem + 1 > state.searchResults.length - 1) {
    newHighlightedItem = 0;
  } else {
    newHighlightedItem = state.highlightedItem + 1;
  }

  return {
    ...state,
    highlightedItem: newHighlightedItem
  };
};

const highlightItemUp = state => {
  let newHighlightedItem;

  if (state.highlightedItem === null) {
    newHighlightedItem = state.searchResults.length - 1;
  } else if (state.highlightedItem - 1 < 0) {
    newHighlightedItem = state.searchResults.length - 1;
  } else {
    newHighlightedItem = state.highlightedItem - 1;
  }

  return {
    ...state,
    highlightedItem: newHighlightedItem
  };
};

export const SearchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_SUCCESS:
      return searchSuccess(state, action);
    case FILTER_DASHBOARD:
      return filterDashboard(state, action);
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

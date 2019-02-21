import { SEARCH_SUCCESS, RESET_RESULTS } from './search.actions';

const initialState = {
  searchResults: []
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

export const SearchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_SUCCESS:
      return searchSuccess(state, action);
    case RESET_RESULTS:
      return resetResults(state);
    default:
      return state;
  }
};

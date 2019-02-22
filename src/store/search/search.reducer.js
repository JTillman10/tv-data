import {
  SEARCH_SUCCESS,
  RESET_RESULTS,
  SELECT_ITEM,
  SELECT_ITEM_DOWN,
  SELECT_ITEM_UP
} from './search.actions';

const initialState = {
  searchResults: [],
  selectedItem: null
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

const selectItem = (state, action) => {
  return {
    ...state,
    selectedItem: action.selectedItem
  };
};

const selectItemDown = state => {
  return {
    ...state,
    selectedItem: state.selectedItem + 1
  };
};

const selectItemUp = state => {
  return {
    ...state,
    selectedItem: state.selectedItem - 1
  };
};

export const SearchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_SUCCESS:
      return searchSuccess(state, action);
    case RESET_RESULTS:
      return resetResults(state);
    case SELECT_ITEM:
      return selectItem(state, action);
    case SELECT_ITEM_DOWN:
      return selectItemDown(state, action);
    case SELECT_ITEM_UP:
      return selectItemUp(state, action);
    default:
      return state;
  }
};

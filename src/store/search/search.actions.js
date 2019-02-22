import { SearchShow } from '../../axios/search';

export const SEARCH_SUCCESS = 'SEARCH_SUCCESS';
export const RESET_RESULTS = 'RESET_RESULTS';
export const SELECT_ITEM_DOWN = 'SELECT_ITEM_DOWN';
export const SELECT_ITEM_UP = 'SELECT_ITEM_UP';
export const SELECT_ITEM = 'SELECT_ITEM';

const searchSuccess = searchResults => {
  return {
    type: SEARCH_SUCCESS,
    searchResults
  };
};

const resetSearchResults = () => {
  return {
    type: RESET_RESULTS
  };
};

export const search = searchParameter => {
  return dispatch => {
    if (searchParameter.length > 3) {
      SearchShow(searchParameter).then(response => {
        dispatch(searchSuccess(response.data.results));
      });
    } else {
      dispatch(resetSearchResults());
    }
  };
};

export const selectItem = selectedItem => {
  return {
    type: SELECT_ITEM,
    selectedItem
  };
};
export const selectItemDown = () => {
  return {
    type: SELECT_ITEM_DOWN
  };
};
export const selectItemUp = () => {
  return {
    type: SELECT_ITEM_UP
  };
};

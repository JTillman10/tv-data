import { SearchShow } from '../../axios/search';

export const SEARCH_SUCCESS = 'SEARCH_SUCCESS';
export const RESET_RESULTS = 'RESET_RESULTS';

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

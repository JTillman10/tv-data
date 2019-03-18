import { GetPopularShows, GetTopRatedShows, SearchShow } from '../../api/search';
import { startLoading, stopLoading } from '../base/base.actions';

export const SEARCH_SUCCESS = 'SEARCH_SUCCESS';
export const FILTER_DASHBOARD = 'FILTER_DASHBOARD';
export const RESET_RESULTS = 'RESET_RESULTS';
export const HIGHLIGHT_ITEM_DOWN = 'HIGHLIGHT_ITEM_DOWN';
export const HIGHLIGHT_ITEM_UP = 'HIGHLIGHT_ITEM_UP';
export const HIGHLIGHT_ITEM = 'HIGHLIGHT_ITEM';

const searchSuccess = searchResults => {
  return {
    type: SEARCH_SUCCESS,
    searchResults
  };
};

const filterDashboardSuccess = (filterType, results) => {
  return {
    type: FILTER_DASHBOARD,
    filterType,
    results
  };
};

export const resetSearchResults = () => {
  return {
    type: RESET_RESULTS
  };
};

export const getPopularShows = () => {
  return dispatch => {
    dispatch(startLoading());
    return GetPopularShows().then(response => {
      dispatch(filterDashboardSuccess('popular', response.data.results));
      dispatch(stopLoading());
    });
  };
};

export const getTopRatedShows = () => {
  return dispatch => {
    dispatch(startLoading());
    return GetTopRatedShows().then(response => {
      dispatch(filterDashboardSuccess('topRated', response.data.results));
      dispatch(stopLoading());
    });
  };
};

export const filterDashboard = newFilter => {
  if (newFilter === 'popular') {
    return getPopularShows();
  } else if (newFilter === 'topRated') {
    return getTopRatedShows();
  }
};

export const search = searchParameter => {
  return dispatch => {
    if (searchParameter.length > 3) {
      return SearchShow(searchParameter).then(response => {
        dispatch(searchSuccess(response.data.results));
      });
    } else {
      dispatch(resetSearchResults());
    }
  };
};

export const highlightItem = highlightedItem => {
  return {
    type: HIGHLIGHT_ITEM,
    highlightedItem
  };
};

export const highlightItemDown = () => {
  return {
    type: HIGHLIGHT_ITEM_DOWN
  };
};

export const highlightItemUp = () => {
  return {
    type: HIGHLIGHT_ITEM_UP
  };
};

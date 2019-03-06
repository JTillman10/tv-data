import {
  GET_SHOW,
  GET_EPISODES_FOR_SEASON,
  UPDATE_SELECTED_SEASON,
  SELECT_EPISODE
} from './show.actions';

const initialState = {
  showInfo: null,
  selectedSeason: 1,
  episodes: null,
  selectedEpisodeId: null
};

const getShow = (state, action) => {
  return {
    ...state,
    showInfo: action.showInfo
  };
};

const getEpisodesForSeason = (state, action) => {
  return {
    ...state,
    episodes: action.episodes
  };
};

const updateSelectedSeason = (state, action) => {
  return {
    ...state,
    selectedSeason: action.selectedSeason
  };
};

const selectEpisode = (state, action) => {
  return {
    ...state,
    selectedEpisodeId: action.selectedEpisodeId
  };
};

export const ShowReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SHOW:
      return getShow(state, action);
    case GET_EPISODES_FOR_SEASON:
      return getEpisodesForSeason(state, action);
    case UPDATE_SELECTED_SEASON:
      return updateSelectedSeason(state, action);
    case SELECT_EPISODE:
      return selectEpisode(state, action);
    default:
      return state;
  }
};

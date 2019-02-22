import {
  GET_SHOW,
  GET_EPISODE,
  GET_EPISODES_FOR_SEASON,
  UPDATE_SELECTED_SEASON
} from './show.actions';

const initialState = {
  showInfo: null,
  selectedSeason: 1,
  episodes: null,
  selectedEpisode: null
};

const getShow = (state, action) => {
  return {
    ...state,
    showInfo: action.showInfo
  };
};

const getEpisode = (state, action) => {
  return {
    ...state,
    selectedEpisode: action.selectedEpisode
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

export const ShowReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SHOW:
      return getShow(state, action);
    case GET_EPISODE:
      return getEpisode(state, action);
    case GET_EPISODES_FOR_SEASON:
      return getEpisodesForSeason(state, action);
    case UPDATE_SELECTED_SEASON:
      return updateSelectedSeason(state, action);
    default:
      return state;
  }
};

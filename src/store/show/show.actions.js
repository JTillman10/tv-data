import { GetAllSeasons, GetSeason, GetShow } from '../../api/show';

export const GET_SHOW = 'GET_SHOW';
export const GET_EPISODES_FOR_SEASON = 'GET_EPISODES_FOR_SEASON';
export const UPDATE_SELECTED_SEASON = 'UPDATE_SELECTED_SEASON';
export const SELECT_EPISODE = 'SELECT_EPISODE';

const getShowSuccess = showInfo => {
  return {
    type: GET_SHOW,
    showInfo
  };
};

const getEpisodesForSeasonSuccess = episodes => {
  return {
    type: GET_EPISODES_FOR_SEASON,
    episodes
  };
};

export const getShow = showId => {
  return dispatch => {
    return GetShow(showId).then(response => {
      dispatch(getShowSuccess(response.data));
    });
  };
};

export const selectEpisode = selectedEpisodeId => {
  return {
    type: SELECT_EPISODE,
    selectedEpisodeId
  };
};

export const getEpisodesForSeason = (showId, seasonNumber, totalSeasons) => {
  return dispatch => {
    if (seasonNumber === 'all') {
      return GetAllSeasons(showId, totalSeasons).then(response => {
        const episodes = response;
        dispatch(getEpisodesForSeasonSuccess(episodes));
      });
    } else {
      return GetSeason(showId, seasonNumber).then(response => {
        const episodes = response.data.episodes;
        dispatch(getEpisodesForSeasonSuccess(episodes));
      });
    }
  };
};

export const updateSelectedSeason = seasonNumber => {
  return {
    type: UPDATE_SELECTED_SEASON,
    seasonNumber
  };
};

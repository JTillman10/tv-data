import { GetAllSeasons, GetEpisode, GetSeason, GetShow } from '../../api/tv';

export const GET_SHOW = 'GET_SHOW';
export const GET_EPISODE = 'GET_EPISODE';
export const GET_EPISODES_FOR_SEASON = 'GET_EPISODES_FOR_SEASON';
export const UPDATE_SELECTED_SEASON = 'UPDATE_SELECTED_SEASON';

const getShowSuccess = showInfo => {
  return {
    type: GET_SHOW,
    showInfo
  };
};

const getEpisodeSuccess = selectedEpisode => {
  return {
    type: GET_EPISODE,
    selectedEpisode
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
    GetShow(showId).then(response => {
      dispatch(getShowSuccess(response.data));
    });
  };
};

export const getEpisode = (showId, seasonNumber, episodeNumber) => {
  return dispatch => {
    GetEpisode(showId, seasonNumber, episodeNumber).then(response => {
      dispatch(getEpisodeSuccess(response.data));
    });
  };
};

export const getEpisodesForSeason = (showId, seasonNumber, totalSeasons) => {
  return dispatch => {
    if (seasonNumber === 'all') {
      GetAllSeasons(showId, totalSeasons).then(response => {
        const episodes = response;
        dispatch(getEpisodesForSeasonSuccess(episodes));
      });
    } else {
      GetSeason(showId, seasonNumber).then(response => {
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

import { ShowReducer } from './show.reducer';
import {
  GET_SHOW,
  GET_EPISODES_FOR_SEASON,
  UPDATE_SELECTED_SEASON,
  SELECT_EPISODE
} from './show.actions';

describe('ShowReducer', () => {
  let reducer;
  const initialState = {
    showInfo: null,
    selectedSeason: 1,
    episodes: null,
    selectedEpisodeNumber: null,
    selectedEpisodeSeasonNumber: null
  };

  beforeEach(() => {
    reducer = ShowReducer;
  });

  it('exists', () => {
    expect(reducer).toBeTruthy();
  });

  it('should return the initial state', () => {
    const result = reducer(undefined, {});
    expect(result).toEqual(initialState);
  });

  it('should handle GET_SHOW', () => {
    const showInfo = 'showInfo';
    const result = reducer(initialState, { type: GET_SHOW, showInfo });
    expect(result).toEqual({
      showInfo,
      selectedSeason: 1,
      episodes: null,
      selectedEpisodeNumber: null,
      selectedEpisodeSeasonNumber: null
    });
  });

  it('should handle GET_EPISODES_FOR_SEASON', () => {
    const episodes = 'episodes';
    const result = reducer(initialState, { type: GET_EPISODES_FOR_SEASON, episodes });
    expect(result).toEqual({
      showInfo: null,
      selectedSeason: 1,
      episodes,
      selectedEpisodeNumber: null,
      selectedEpisodeSeasonNumber: null
    });
  });

  it('should handle UPDATE_SELECTED_SEASON', () => {
    const selectedSeason = 'selectedSeason';
    const result = reducer(initialState, { type: UPDATE_SELECTED_SEASON, selectedSeason });
    expect(result).toEqual({
      showInfo: null,
      selectedSeason,
      episodes: null,
      selectedEpisodeNumber: null,
      selectedEpisodeSeasonNumber: null
    });
  });

  it('should handle SELECT_EPISODE', () => {
    const seasonNumber = 'selectedSeason';
    const episodeNumber = 'selectedEpisode';
    const result = reducer(initialState, {
      type: SELECT_EPISODE,
      seasonNumber,
      episodeNumber
    });
    expect(result).toEqual({
      showInfo: null,
      selectedSeason: 1,
      episodes: null,
      selectedEpisodeNumber: episodeNumber,
      selectedEpisodeSeasonNumber: seasonNumberw
    });
  });
});

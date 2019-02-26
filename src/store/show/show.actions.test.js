import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';

import { APIKEY, BASEURL } from '../../api/constants';

import {
  GET_SHOW,
  GET_EPISODE,
  GET_EPISODES_FOR_SEASON,
  UPDATE_SELECTED_SEASON,
  getShow,
  getEpisode,
  getEpisodesForSeason,
  updateSelectedSeason
} from './show.actions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('ShowActions', () => {
  let store;

  beforeEach(() => {
    store = mockStore({});
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  describe('getShow', () => {
    it('should create GET_SHOW', async done => {
      const showId = 1;
      const showInfo = 'showInfo';
      moxios.stubRequest(`${BASEURL}/tv/${showId}?api_key=${APIKEY}`, {
        status: 200,
        response: showInfo
      });

      const expectedActions = [{ type: GET_SHOW, showInfo }];
      await store.dispatch(getShow(showId)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });

      moxios.uninstall();
      done();
    });
  });

  describe('getEpisode', () => {
    it('should create GET_EPISODE', async done => {
      const showId = 1;
      const seasonNumber = 1;
      const episodeNumber = 1;
      const selectedEpisode = 'selectedEpisode';
      moxios.stubRequest(
        `${BASEURL}/tv/${showId}/season/${seasonNumber}/episode/${episodeNumber}?api_key=${APIKEY}`,
        {
          status: 200,
          response: selectedEpisode
        }
      );

      const expectedActions = [{ type: GET_EPISODE, selectedEpisode }];
      await store.dispatch(getEpisode(showId, seasonNumber, episodeNumber)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });

      moxios.uninstall();
      done();
    });
  });

  describe('getEpisodesForSeason', () => {
    const showId = 1;
    const seasonNumber = 1;
    const totalSeasons = 2;
    const episodes = {
      1: ['episode1', 'episode2'],
      2: ['episode3', 'episode4']
    };

    it('should create GET_EPISODES_FOR_SEASON with all seasons', async done => {
      const allEpisodes = ['episode1', 'episode2', 'episode3', 'episode4'];

      for (let i = 1; i <= totalSeasons; i++) {
        moxios.stubRequest(`${BASEURL}/tv/${showId}/season/${i}?api_key=${APIKEY}`, {
          status: 200,
          response: { episodes: episodes[i] }
        });
      }

      const expectedActions = [{ type: GET_EPISODES_FOR_SEASON, episodes: allEpisodes }];
      await store.dispatch(getEpisodesForSeason(showId, 'all', totalSeasons)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });

      moxios.uninstall();
      done();
    });

    it('should create GET_EPISODES_FOR_SEASON with one season', async done => {
      const season1Episodes = ['episode1', 'episode2'];

      moxios.stubRequest(`${BASEURL}/tv/${showId}/season/${seasonNumber}?api_key=${APIKEY}`, {
        status: 200,
        response: { episodes: episodes[seasonNumber] }
      });

      const expectedActions = [{ type: GET_EPISODES_FOR_SEASON, episodes: season1Episodes }];
      await store.dispatch(getEpisodesForSeason(showId, seasonNumber, totalSeasons)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });

      moxios.uninstall();
      done();
    });
  });

  describe('updateSelectedSeason', () => {
    it('should create UPDATE_SELECTED_SEASON', () => {
      const seasonNumber = 1;
      const expectedAction = { type: UPDATE_SELECTED_SEASON, seasonNumber };

      const result = updateSelectedSeason(seasonNumber);
      expect(result).toEqual(expectedAction);
    });
  });
});

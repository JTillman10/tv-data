import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';

import { APIKEY, BASEURL } from '../../api/constants';
import {
  search,
  highlightItem,
  highlightItemDown,
  highlightItemUp,
  SEARCH_SUCCESS,
  RESET_RESULTS,
  HIGHLIGHT_ITEM_DOWN,
  HIGHLIGHT_ITEM_UP,
  HIGHLIGHT_ITEM,
  resetSearchResults,
  FILTER_DASHBOARD,
  filterDashboard
} from './search.actions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('SearchActions', () => {
  describe('search', () => {
    let store;

    beforeEach(() => {
      store = mockStore({});
    });

    it('should create SEARCH_SUCCESS when searchParameter has length greater than 3', async done => {
      const searchParameter = 'aaaa';
      const searchResults = 'results';

      moxios.install();

      moxios.stubRequest(`${BASEURL}/search/tv?api_key=${APIKEY}&query=${searchParameter}`, {
        status: 200,
        response: { results: searchResults }
      });

      const expectedActions = [{ type: SEARCH_SUCCESS, searchResults }];
      await store.dispatch(search(searchParameter)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });

      moxios.uninstall();
      done();
    });
  });

  describe('resetSearchResults', () => {
    it('returns type RESET_RESULTs', () => {
      const result = resetSearchResults();
      expect(result.type).toBe(RESET_RESULTS);
    });
  });

  describe('filterDashboard', () => {
    let store,
      popularResults = ['popular show'],
      topRatedResults = ['top rated show'];

    beforeEach(() => {
      store = mockStore({});

      moxios.install();

      const results = 'results';
      moxios.stubRequest(`${BASEURL}/tv/popular?api_key=${APIKEY}`, {
        status: 200,
        response: { results: popularResults }
      });

      moxios.stubRequest(`${BASEURL}/tv/top_rated?api_key=${APIKEY}`, {
        status: 200,
        response: { results: topRatedResults }
      });
    });

    afterEach(() => {
      moxios.uninstall();
    });

    it('when newFilter is popular it should create FILTER_DASHBOARD with popular filterType ', async done => {
      const newFilter = 'popular';

      const expectedActions = [
        { type: FILTER_DASHBOARD, filterType: newFilter, results: popularResults }
      ];

      await store.dispatch(filterDashboard(newFilter)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });

      done();
    });
  });

  describe('highlightItem', () => {
    it('should create HIGHLIGHT_ITEM', () => {
      const highlightedItem = 'item';
      const expectedAction = { type: HIGHLIGHT_ITEM, highlightedItem };

      const result = highlightItem(highlightedItem);
      expect(result).toEqual(expectedAction);
    });
  });

  describe('highlightItemDown', () => {
    it('should create HIGHLIGHT_ITEM_DOWN', () => {
      const expectedAction = { type: HIGHLIGHT_ITEM_DOWN };

      const result = highlightItemDown();
      expect(result).toEqual(expectedAction);
    });
  });

  describe('highlightItemUp', () => {
    it('should create HIGHLIGHT_ITEM_UP', () => {
      const expectedAction = { type: HIGHLIGHT_ITEM_UP };

      const result = highlightItemUp();
      expect(result).toEqual(expectedAction);
    });
  });
});

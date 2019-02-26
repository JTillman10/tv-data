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
  HIGHLIGHT_ITEM
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
      moxios.install();

      const searchParameter = 'aaaa';
      const searchResults = 'results';
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

    it('should create RESET_RESULTS when searchParameter has length 3 or less', () => {
      const searchParameter = 'aaa';

      const expectedActions = [{ type: RESET_RESULTS }];
      store.dispatch(search(searchParameter));
      expect(store.getActions()).toEqual(expectedActions);
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

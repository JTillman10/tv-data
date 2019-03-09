import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import { BaseReducer } from './base/base.reducer';
import { SearchReducer } from './search/search.reducer';
import { ShowReducer } from './show/show.reducer';

const composeEnhancers =
  process.env.NODE_ENV === 'development'
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null || compose;

const rootReducer = combineReducers({
  base: BaseReducer,
  search: SearchReducer,
  show: ShowReducer
});

export const Store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

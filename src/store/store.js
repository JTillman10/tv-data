import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import { SearchReducer } from './search/search.reducer';
import { ShowReducer } from './show/show.reducer';

const composeEnhancers =
  process.env.NODE_ENV === 'development'
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null || compose;

const rootReducer = combineReducers({
  search: SearchReducer,
  show: ShowReducer
});

export const Store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

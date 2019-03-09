import { START_LOADING, STOP_LOADING } from './base.actions';

const initialState = {
  isLoading: 0
};

const startLoading = state => {
  return {
    ...state,
    isLoading: state.isLoading + 1
  };
};

const stopLoading = state => {
  return {
    ...state,
    isLoading: state.isLoading - 1
  };
};

export const BaseReducer = (state = initialState, action) => {
  switch (action.type) {
    case START_LOADING:
      return startLoading(state);
    case STOP_LOADING:
      return stopLoading(state);
    default:
      return state;
  }
};

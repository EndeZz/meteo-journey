import { CITY_FAILURE, CITY_LOADING, FETCH_CITY, SET_CITY } from './types';

const initialState = {
  city: [],
  loading: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CITY:
      return { ...state, city: action.city };
    case CITY_LOADING:
      return { ...state, loading: action.loading };
    case CITY_FAILURE:
      return { ...state, error: action.error };
    case SET_CITY:
      return state;
    default:
      return state;
  }
};

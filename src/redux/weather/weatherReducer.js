import { FETCH_WEATHER, FETCH_WEATHER_MORE } from './types';

const initialState = {
  weatherData: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_WEATHER:
      return { ...state };
    case FETCH_WEATHER_MORE:
      return { ...state, weatherData: action.payload };
    default:
      return state;
  }
};

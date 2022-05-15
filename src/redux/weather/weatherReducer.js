import {
  CHANGE_DAY,
  FETCH_WEATHER,
  FETCH_WEATHER_MORE,
  WEATHER_FAILURE,
  WEATHER_LOADING,
} from './types';

const initialState = {
  weatherData: {},
  weatherCities: [],
  weatherDays: null,
  currentDay: null,
  loading: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_WEATHER:
      return { ...state, weatherCities: action.weatherCities };
    case FETCH_WEATHER_MORE:
      return { ...state, weatherData: action.weatherData, weatherDays: action.weatherDays };
    case WEATHER_LOADING:
      return { ...state, loading: action.loading };
    case WEATHER_FAILURE:
      return { ...state, error: action.error };
    case CHANGE_DAY:
      return {
        ...state,
        currentDay: state.weatherDays[action.payload] === state.weatherDays[0]
          ? state.weatherData.current
          : state.weatherDays[action.payload],
      };
    default:
      return state;
  }
};

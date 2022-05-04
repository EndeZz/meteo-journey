import { WEATHER_API } from '../../constants/api';
import { fetchApi } from '../../utils/fetchApi';
import { FETCH_WEATHER, FETCH_WEATHER_MORE } from './types';

export const getWeather = (weatherData) => {
  return {
    type: FETCH_WEATHER,
    payload: weatherData,
  };
};

export const getWeatherMore = (weatherData) => {
  return {
    type: FETCH_WEATHER_MORE,
    payload: weatherData,
  };
};

export const fetchWeatherMore = (city) => {
  return async (dispatch) => {
    try {
      const weatherUrl = `${WEATHER_API.URL}/weather?q=${city}&appid=${WEATHER_API.KEY}&lang=ru&units=metric`;
      const weatherRes = await fetchApi(weatherUrl);

      const forecastUrl = `${WEATHER_API.URL}/onecall?lat=${weatherRes.coord.lat}&lon=${weatherRes.coord.lon}&lang=ru&appid=${WEATHER_API.KEY}`;
      const forecastRes = await fetchApi(forecastUrl);

      dispatch(getWeatherMore(forecastRes));
    } catch (error) {
      console.error(error);
    }
  };
};

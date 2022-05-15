import { WEATHER_API } from '../../constants/api';
import { fetchApi } from '../../utils/fetchApi';
import {
  CHANGE_DAY,
  FETCH_WEATHER,
  FETCH_WEATHER_MORE,
  WEATHER_FAILURE,
  WEATHER_LOADING,
} from './types';

export const getWeather = (weatherCities) => {
  return {
    type: FETCH_WEATHER,
    weatherCities,
  };
};

export const getWeatherMore = (weatherData) => {
  return {
    type: FETCH_WEATHER_MORE,
    weatherData,
    weatherDays: weatherData.daily,
  };
};

export const setLoading = (loading) => {
  return {
    type: WEATHER_LOADING,
    loading,
  };
};

export const setError = (error) => {
  return {
    type: WEATHER_FAILURE,
    error,
  };
};

export const changeDay = (day) => {
  return {
    type: CHANGE_DAY,
    payload: day,
  };
};

export const fetchWeather = (cities) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    dispatch(setError(null));
    try {
      const requests = cities.map(async (city) => {
        const weatherUrl = `${WEATHER_API.URL}/weather?q=${city.name}&lang=ru&units=metric&appid=${WEATHER_API.KEY}`;
        const weatherRes = await fetchApi(weatherUrl);
        return weatherRes;
      });

      Promise.all(requests).then((data) => {
        dispatch(getWeather(data));
        dispatch(setLoading(false));
      });
    } catch (error) {
      dispatch(setError(error.message));
      dispatch(setLoading(false));
    }
  };
};

export const fetchWeatherMore = (city) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    dispatch(setError(null));
    try {
      const weatherUrl = `${WEATHER_API.URL}/weather?q=${city}&lang=ru&units=metric&appid=${WEATHER_API.KEY}`;
      const weatherRes = await fetchApi(weatherUrl);
      const forecastUrl = `${WEATHER_API.URL}/onecall?lat=${weatherRes.coord.lat}&lon=${weatherRes.coord.lon}&exclude=alerts,minutely&lang=ru&units=metric&appid=${WEATHER_API.KEY}`;
      const forecastRes = await fetchApi(forecastUrl);
      dispatch(getWeatherMore(forecastRes));
      dispatch(changeDay(0));
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setError(error.message));
      dispatch(setLoading(false));
    }
  };
};

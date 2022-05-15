import { createSelector } from 'reselect';

export const weatherSelector = (state) => state.weatherInfo;

export const weatherDataSelector = createSelector(
  weatherSelector,
  (weather) => weather.weatherData
);

export const weatherDaysSelector = createSelector(
  weatherSelector,
  (weather) => weather.weatherDays
);

export const weatherCurrentDaySelector = createSelector(
  weatherSelector,
  (weather) => weather.currentDay
);

export const weatherLoadingSelector = createSelector(
  weatherSelector,
  (weather) => weather.loading
);

export const weatherCitiesSelector = createSelector(
  weatherSelector,
  (weather) => weather.weatherCities
);
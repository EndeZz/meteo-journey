import { days, months } from '../constants/constants';

export const getWeekDay = (dayNum) => {
  const currentDay = new Date(dayNum * 1000);
  return days[currentDay.getDay()];
};

export const getFullDate = (dayNum) => {
  const currentDate = new Date(dayNum * 1000);
  const dayValue = String(currentDate.getDate()).padStart(2, '0');
  const monthValue = months[currentDate.getMonth()];
  return `${dayValue} ${monthValue}`;
};

export const getFullTime = (dayNum) => {
  const currentDate = new Date(dayNum * 1000);
  const hourValue = String(currentDate.getHours()).padStart(2, '0');
  const minuteValue = String(currentDate.getMinutes()).padStart(2, '0');
  return `${hourValue}:${minuteValue}`;
};

export const getRandomCities = (arrayValues) => {
  const uniqValues = [...new Set(arrayValues.map((city) => city.name))];
  const randomValues = uniqValues.sort(() => Math.random() - 0.5).slice(0, 8);
  return randomValues;
};

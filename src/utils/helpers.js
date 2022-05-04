import { days, months } from '../constants/constants';

export const getWeekDay = (dayNum) => {
  const currentDay = new Date(dayNum.dt * 1000);
  return days[currentDay.getDay()];
};

export const getFullDate = (dayNum) => {
  const currentDate = new Date(dayNum.dt * 1000);
  return `${String(currentDate.getDate()).padStart(2, '0')} ${months[currentDate.getMonth()]}`;
};

export const getCityTime = () => {
  const currentTime = new Date().toLocaleString('default', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return currentTime;
};
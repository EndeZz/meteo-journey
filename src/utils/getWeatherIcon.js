import cloud from './../../public/images/weatherPic/cloud.png';
import clearSky from './../../public/images/weatherPic/clear-sky.png';
import fewClouds from './../../public/images/weatherPic/few-clouds.png';
import rain from './../../public/images/weatherPic/rain.png';
import drizzle from './../../public/images/weatherPic/drizzle.png';
import thunderstorm from './../../public/images/weatherPic/thunderstorm.png';
import snow from './../../public/images/weatherPic/snow.png';
import dust from './../../public/images/weatherPic/dust.png';
import fog from './../../public/images/weatherPic/fog.png';

export const getWeatherIcon = (weatherId) => {
  switch (weatherId) {
    case 'Clear':
      return clearSky;
    case 'Drizzle':
      return drizzle;
    case 'Rain':
      return rain;
    case 'Thunderstorm':
      return thunderstorm;
    case 'Snow':
      return snow;
    case 'Dust' || 'Sand' || 'Ash':
      return dust;
    case 'Fog' || 'Haze' || 'Smoke' || 'Mist' || 'Squall':
      return fog;
    case 'Tornado':
      return Tornado;
    default:
      return cloud;
  }
};

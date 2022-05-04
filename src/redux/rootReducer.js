import { combineReducers } from 'redux';
import favoriteReducer from './favorite/favoriteReducer';
import weatherReducer from './weather/weatherReducer';

const rootReducer = combineReducers({
  weatherInfo: weatherReducer,
  favorites: favoriteReducer,
});

export default rootReducer;

import { combineReducers } from 'redux';
import favoriteReducer from './favorite/favoriteReducer';
import weatherReducer from './weather/weatherReducer';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';
import authReducer from './auth/authReducer';
import cityReducer from './city/cityReducer';

const rootReducer = combineReducers({
  weatherInfo: weatherReducer,
  favorites: favoriteReducer,
  city: cityReducer,
  auth: authReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer,
});

export default rootReducer;

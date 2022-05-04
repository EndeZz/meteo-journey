import { ADD_TO_FAVORITE, REMOVE_FROM_FAVORITE } from './types';

export const addToFavorites = (city) => {
  return {
    type: ADD_TO_FAVORITE,
    payload: city,
  };
};

export const removeFromFavorites = (city) => {
  return {
    type: REMOVE_FROM_FAVORITE,
    payload: city,
  };
};

import { getLocalStorage } from '../../utils/localStorage';
import { ADD_TO_FAVORITE, FAVORITE_FAILURE, FAVORITE_LOADING, REMOVE_FROM_FAVORITE } from './types';

const initialState = {
  favoriteData: [],
  loading: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_FAVORITE:
      const cityNameFiltered = state.favoriteData.filter(
        (city) => city.name === action.favoriteData.name
      );
      if (cityNameFiltered < 1) {
        return {
          ...state,
          favoriteData: [...state.favoriteData, action.favoriteData],
        };
      } else {
        return state;
      }
    case REMOVE_FROM_FAVORITE:
      return state;
    case FAVORITE_LOADING:
      return { ...state, loading: action.loading };
    case FAVORITE_FAILURE:
      return { ...state, error: action.error };
    default:
      return state;
  }
};

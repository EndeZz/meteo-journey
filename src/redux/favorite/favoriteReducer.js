import { getLocalStorage } from '../../utils/localStorage';
import { ADD_TO_FAVORITE, REMOVE_FROM_FAVORITE } from './types';

const initialState = getLocalStorage('store');

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_FAVORITE:
      const cityNameFiltered = state.filter((city) => city.name === action.payload.name);
      if (cityNameFiltered < 1) {
        return [...state, action.payload];
      } else {
        return state;
      }
    case REMOVE_FROM_FAVORITE:
      return state.filter((city) => {
        return !(city.name === action.payload.name);
      });
    default:
      return state;
  }
};

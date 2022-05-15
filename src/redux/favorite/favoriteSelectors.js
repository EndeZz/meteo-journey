import { createSelector } from 'reselect';

export const favoriteValuesSelector = (state) => state.firestore.ordered.favorites;

export const favoriteSelectors = createSelector(
  favoriteValuesSelector,
  (_, name) => name,
  (favoriteValues, name) => favoriteValues && favoriteValues.find((city) => city.name === name)
);

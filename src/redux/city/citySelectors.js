import { createSelector } from 'reselect';

export const citySelector = (state) => state.city.city;

export const citiesStoreSelector = (state) => state.firestore.ordered.cities;

export const citiesValuesSelectors = createSelector(
  citiesStoreSelector,
  (_, name) => name,
  (cityValues, name) => cityValues && cityValues.filter((city) => city.name !== name)
);

export const cityAlreadyExistsSelectors = createSelector(
  citiesStoreSelector,
  (_, name) => name,
  (cityValues, name) => cityValues && cityValues.find((city) => city.name === name)
);

export const citySuggestionsSelector = createSelector(citySelector, (city) => city.suggestions);

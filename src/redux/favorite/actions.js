import { ADD_TO_FAVORITE, FAVORITE_FAILURE, REMOVE_FROM_FAVORITE } from './types';

export const addFavorites = () => {
  return {
    type: ADD_TO_FAVORITE,
  };
};

export const removeFavorites = () => {
  return {
    type: REMOVE_FROM_FAVORITE,
  }
};

export const updateFavoritesError = (error) => {
  return {
    type: FAVORITE_FAILURE,
    error,
  };
};

export const addToFavorites = (city) => {
  return (dispatch, getState, { getFirebase }) => {
    const firestore = getFirebase().firestore();
    const authorId = getState().firebase.auth.uid;
    firestore
      .collection('favorites')
      .add({
        ...city,
        date: new Date(),
        authorId: authorId,
      })
      .then(() => {
        dispatch(addFavorites());
      })
      .catch((error) => {
        dispatch(updateFavoritesError(error.message));
      });
  };
};

export const removeFromFavorites = (city) => {
  return (dispatch, getState, { getFirebase }) => {
    const firestore = getFirebase().firestore();
    firestore
      .collection('favorites')
      .doc(city.id)
      .delete()
      .then(() => {
        dispatch(removeFavorites());
      })
      .catch((error) => {
        dispatch(updateFavoritesError(error.message));
      });
  };
};

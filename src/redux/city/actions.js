import { fetchApi } from '../../utils/fetchApi';
import { CITY_FAILURE, CITY_LOADING, FETCH_CITY, SET_CITY } from './types';

export const getCity = (city) => {
  return {
    type: FETCH_CITY,
    city,
  };
};

export const setCity = () => {
  return {
    type: SET_CITY,
  };
};

export const setLoading = (loading) => {
  return {
    type: CITY_LOADING,
    loading,
  };
};

export const setError = (error) => {
  return {
    type: CITY_FAILURE,
    error,
  };
};

export const addToCities = (city) => {
  return (dispatch, getState, { getFirebase }) => {
    const firestore = getFirebase().firestore();
    firestore
      .collection('cities')
      .add({
        ...city,
        date: new Date(),
      })
      .then(() => {
        dispatch(setCity());
      })
      .catch((error) => {
        dispatch(setError(error.message));
      });
  };
};

export const fetchCity = (searchValue) => {
  const options = {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'Token ' + process.env.CITY_API_KEY,
    },
    body: JSON.stringify({
      query: searchValue,
      from_bound: { value: 'city' },
      to_bound: { value: 'city' },
      locations: [
        {
          city_type_full: 'город',
        },
        // {
        //   country: '*',
        // },
      ],
      restrict_value: true,
    }),
  };

  return async (dispatch) => {
    dispatch(setLoading(true));
    dispatch(setError(null));
    try {
      const cityRes = await fetchApi( process.env.CITY_API_URL, options);
      dispatch(getCity(cityRes));
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setError(error.message));
      dispatch(setLoading(false));
    }
  };
};

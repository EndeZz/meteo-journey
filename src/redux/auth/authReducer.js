import { firestore } from '../../config/firebaseConfig';
import {
  USER_LOGIN,
  USER_LOGIN_FAILURE,
  USER_LOGOUT,
  USER_LOGOUT_FAILURE,
  USER_SIGNUP,
  USER_SIGNUP_FAILURE,
} from './types';

const initialState = {
  isAuth: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN:
      return { ...state, isAuth: true, user: action.user };
    case USER_LOGIN_FAILURE:
      return { ...state, error: action.error };
    case USER_LOGOUT:
      return { ...state, isAuth: false };
    case USER_LOGOUT_FAILURE:
      return { ...state, error: action.error };
    case USER_SIGNUP:
      return { ...state, isAuth: true };
    case USER_SIGNUP_FAILURE:
      return { ...state, error: action.error };
    default:
      return state;
  }
};

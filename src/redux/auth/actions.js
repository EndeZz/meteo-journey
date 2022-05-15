import {
  USER_LOGIN,
  USER_LOGIN_FAILURE,
  USER_LOGOUT,
  USER_LOGOUT_FAILURE,
  USER_SIGNUP,
  USER_SIGNUP_FAILURE,
} from './types';

export const logInUser = () => {
  return {
    type: USER_LOGIN,
  };
};

export const logInUserError = (error) => {
  return {
    type: USER_LOGIN_FAILURE,
    error,
  };
};

export const logOutUser = () => {
  return {
    type: USER_LOGOUT,
  };
};

export const logOutUserError = (error) => {
  return {
    type: USER_LOGOUT_FAILURE,
    error,
  };
};

export const signUpUser = () => {
  return {
    type: USER_SIGNUP,
  };
};

export const signUpUserError = (error) => {
  return {
    type: USER_SIGNUP_FAILURE,
    error,
  };
};

export const signIn = (credentials) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(() => {
        dispatch(logInUser());
      })
      .catch((error) => {
        switch (error.code) {
          case 'auth/user-not-found':
            dispatch(signUpUserError('Пользователь не найден'));
            break;
          case 'auth/invalid-email':
            dispatch(signUpUserError('Адрес электронной почты некорректен'));
            break;

          case 'auth/operation-not-allowed':
            dispatch(signUpUserError('Ошибка при авторизации'));
            break;
          default:
            dispatch(logInUserError(error.message));
            break;
        }
      });
  };
};

export const signOut = () => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch(logOutUser());
      })
      .catch((error) => {
        dispatch(logOutUserError(error.message));
      });
  };
};

export const signUp = (credentials) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase
      .auth()
      .createUserWithEmailAndPassword(credentials.email, credentials.password)
      .then(() => {
        dispatch(signUpUser());
      })
      .catch((error) => {
        switch (error.code) {
          case 'auth/email-already-in-use':
            dispatch(signUpUserError('Адрес электронной почты уже используется'));
            break;
          case 'auth/invalid-email':
            dispatch(signUpUserError('Адрес электронной почты некорректен'));
            break;
          case 'auth/operation-not-allowed':
            dispatch(signUpUserError('Ошибка при регистрации'));
            break;
          case 'auth/weak-password':
            dispatch(signUpUserError('Пароль недостаточно надежен'));
            break;
          default:
            dispatch(dispatch(signUpUserError(error.message)));
            break;
        }
      });
  };
};

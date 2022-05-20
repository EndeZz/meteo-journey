import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import store from './redux/store/store';
import firebase from './config/firebaseConfig';
import { isLoaded, ReactReduxFirebaseProvider } from 'react-redux-firebase';
import { createFirestoreInstance } from 'redux-firestore';
import Loader from './components/Loader';
import { authSelector } from './redux/auth/authSelectors';

const rrfProps = {
  firebase,
  config: {
    userProfile: 'users',
    useFirestoreForProfile: true,
  },
  dispatch: store.dispatch,
  createFirestoreInstance,
};

const AuthIsLoaded = ({ children }) => {
  const auth = useSelector(authSelector);

  return !isLoaded(auth) ? <Loader /> : children;
};

ReactDOM.render(
  <ReactReduxFirebaseProvider {...rrfProps}>
    <Provider store={store}>
      <BrowserRouter>
        <AuthIsLoaded>
          <App />
        </AuthIsLoaded>
      </BrowserRouter>
    </Provider>
  </ReactReduxFirebaseProvider>,
  document.getElementById('root')
);

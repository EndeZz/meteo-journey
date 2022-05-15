import { applyMiddleware, legacy_createStore as createStore } from 'redux';
import { getFirebase } from 'react-redux-firebase';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from '../rootReducer';

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk.withExtraArgument({ getFirebase })))
);

export default store;

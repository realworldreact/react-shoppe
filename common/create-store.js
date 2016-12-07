import { createStore, applyMiddleware, compose } from 'redux';
import ThunkMiddleware from 'redux-thunk';

import reducer from './redux.js';


export default function createAppStore(devTools = (f => f)) {
  const middleware = applyMiddleware(
    ThunkMiddleware
  );

  const storeEnhancer = compose(
    middleware,
    devTools
  );

  return createStore(
    reducer,
    storeEnhancer
  );
}

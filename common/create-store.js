import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import reducer from './redux.js';


export default function createAppStore(devTools = (f => f), deps) {
  const middleware = applyMiddleware(
    thunk.withExtraArgument(deps)
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

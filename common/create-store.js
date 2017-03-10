import { createStore, applyMiddleware, compose } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import thunk from 'redux-thunk';

import reducer, { fetchProductsEpic } from './redux.js';

export default function createAppStore(devTools = (f => f), deps) {
  const epicMiddleware = createEpicMiddleware(fetchProductsEpic);
  const middleware = applyMiddleware(
    thunk.withExtraArgument(deps),
    epicMiddleware
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

import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createEpicMiddleware } from 'redux-observable';

import reducer, { rootEpic } from './redux.js';


export default function createAppStore(devTools = (f => f), deps) {
  const epicMiddleware = createEpicMiddleware(rootEpic);

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

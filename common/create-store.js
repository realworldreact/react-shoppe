import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createEpicMiddleware } from 'redux-observable';

import reducer, { rootEpic } from './redux.js';


export default function createAppStore(devTools = (f => f), deps) {
  const epicMiddle = createEpicMiddleware(rootEpic);
  const middleware = applyMiddleware(
    thunk.withExtraArgument(deps),
    epicMiddle
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

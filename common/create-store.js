import { createStore, applyMiddleware, compose } from 'redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import thunk from 'redux-thunk';

import reducer, { epics } from './redux.js';

export default function createAppStore(devTools = (f => f), deps) {
  const rootEpic = combineEpics(...epics);
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

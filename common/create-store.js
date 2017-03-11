import { createStore, applyMiddleware, compose } from 'redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import thunk from 'redux-thunk';

import reducer, { initialState, epics } from './redux.js';

export default function createAppStore({
  devTools = (f => f),
  deps,
  wrapEpic = (f => f),
  preState = initialState
}) {
  const rootEpic = combineEpics(...epics);
  const epicWithDeps =
    (actions, store) => rootEpic(actions, store, deps);
  const finalEpic = wrapEpic(epicWithDeps);
  // console.log('rootEpic: ', rootEpic);
  const epicMiddleware = createEpicMiddleware(finalEpic);
  const middleware = applyMiddleware(
    thunk.withExtraArgument(deps),
    epicMiddleware
  );


  const storeEnhancer = compose(
    middleware,
    devTools
  );

  const store = createStore(
    reducer,
    preState,
    storeEnhancer
  );

  return {
    store,
    rootEpic: finalEpic
  };
}

import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createEpicMiddleware } from 'redux-observable';

import reducer, { initialState, rootEpic } from './redux.js';


export default function createAppStore({
  initialState: preload = {},
  devTools = (f => f),
  deps = {}
}) {
  const epicMiddleware = createEpicMiddleware(
    rootEpic,
    {
      dependencies: deps
    }
  );

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
    { ...initialState, ...preload },
    storeEnhancer
  );
}

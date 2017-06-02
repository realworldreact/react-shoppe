import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createEpicMiddleware } from 'redux-observable';
import { wrapRootEpic } from 'react-redux-epic';

import reducer, { initialState, rootEpic } from './redux.js';


export default function createAppStore({
  initialState: preload = {},
  devTools = (f => f),
  deps = {}
}) {
  const wrappedRootEpic = wrapRootEpic(rootEpic);
  const epicMiddleware = createEpicMiddleware(
    wrappedRootEpic,
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

  const store = createStore(
    reducer,
    { ...initialState, ...preload },
    storeEnhancer
  );
  return {
    store,
    wrappedRootEpic
  };
}

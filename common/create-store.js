import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createEpicMiddleware } from 'redux-observable';

import reducer, { rootEpic } from './redux.js';


export default function createAppStore(
  devTools = (f => f),
  dependencies,
  wrapEpic = (f => f),
  preload
) {
  const wrappedEpic = wrapEpic(rootEpic);
  const epicMiddle = createEpicMiddleware(wrappedEpic, { dependencies });
  const middleware = applyMiddleware(
    thunk.withExtraArgument(dependencies),
    epicMiddle
  );

  const storeEnhancer = compose(
    middleware,
    devTools
  );

  return {
    wrappedEpic,
    store: createStore(
      reducer,
      preload,
      storeEnhancer
    )
  };
}

import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createEpicMiddleware } from 'redux-observable';

import reducer, { rootEpic } from './redux.js';


export default function createAppStore(
  devTools = (f => f),
  dependencies
) {
  const epicMiddle = createEpicMiddleware(rootEpic, { dependencies });
  const middleware = applyMiddleware(
    thunk.withExtraArgument(dependencies),
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

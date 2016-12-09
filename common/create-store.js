import 'rxjs';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createEpicMiddleware } from 'redux-observable';
import { wrapRootEpic } from 'react-redux-epic';

import rootEpic from './epics.js';
import reducer from './redux.js';


export default function createAppStore({
  preloadedState,
  middlewares = [],
  devTools = (f => f),
  dependencies = {}
} = {}) {

  const finalEpic = wrapRootEpic(
    (actions, store) => rootEpic(actions, store, dependencies)
  );

  const middleware = applyMiddleware(
    ...middlewares,
    thunk.withExtraArgument(dependencies),
    createEpicMiddleware(finalEpic)
  );

  const storeEnhancer = compose(
    middleware,
    devTools
  );

  const store = createStore(
    reducer,
    preloadedState,
    storeEnhancer
  );
  return {
    epic: finalEpic,
    store
  };
}

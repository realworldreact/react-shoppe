import 'rxjs';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createEpicMiddleware } from 'redux-observable';

import rootEpic from './epics.js';
import reducer from './redux.js';


export default function createAppStore({
  middlewares = [],
  devTools = (f => f),
  dependencies = {}
} = {}) {
  const middleware = applyMiddleware(
    ...middlewares,
    thunk.withExtraArgument(dependencies),
    createEpicMiddleware(
      (actions, store) => rootEpic(actions, store, dependencies)
    )
  );

  const storeEnhancer = compose(
    middleware,
    devTools
  );

  const store = createStore(
    reducer,
    storeEnhancer
  );
  return {
    store
  };
}

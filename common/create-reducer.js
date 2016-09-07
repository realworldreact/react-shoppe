import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import appReducer from './redux';

export default function createReducer() {
  return combineReducers({
    app: appReducer,
    routing
  });
}

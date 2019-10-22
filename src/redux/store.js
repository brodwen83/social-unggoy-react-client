import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import userReducer from './user/user.reducer';
import dataReducer from './data/data.reducer';
import uiReducer from './ui/ui.reducer';
import authReducer from './auth/auth.reducer';

const initialState = {};

const middleware = [thunk];

const reducers = combineReducers({
  auth: authReducer,
  user: userReducer,
  data: dataReducer,
  UI: uiReducer,
});

const store = createStore(
  reducers,
  initialState,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__(),
  ),
);

export default store;

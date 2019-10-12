import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './rootReducer';

const { logger } = require('redux-logger');
const middlewares = [thunkMiddleware];

process.env.NODE_ENV === 'development' && middlewares.push(logger);

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(...middlewares)
);

export default store;

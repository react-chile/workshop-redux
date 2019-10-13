import { combineReducers } from 'redux';
import loading from './loading/reducer';
import orders from './orders/reducer';
import errors from './errors/reducer';

export const reducers = () => ({
  ...loading,
  ...orders,
  ...errors,
});

export default combineReducers( reducers() );

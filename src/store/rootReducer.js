import { combineReducers } from 'redux';
import loading from './loading/reducer';
import orders from './orders/reducer';

export const reducers = () => ({
  ...loading,
  ...orders,
});

export default combineReducers( reducers() );

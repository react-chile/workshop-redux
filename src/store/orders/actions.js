import * as types from './constants';

const ordersGet = payload => ({
  type: types.ORDERS_GET,
  payload
});


export {
  ordersGet
};


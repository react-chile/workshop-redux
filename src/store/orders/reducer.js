import {
  ORDERS_GET
} from './constants'

const initialState={
  list:[],
};

export const ordersReducers = (state = initialState, action) => {
  switch (action.type) {
  
    case ORDERS_GET:
      return { list: [...action.payload] };
  
    default:
      return state;
  }
};

export default{
  orders: ordersReducers,
};

import {
  ERRORS_ADD, 
  ERRORS_CLEAR
} from './constants'

const initialState={
  list:[],
};

export const errorsReducers = (state = initialState, action) => {
  switch (action.type) {
  
    case ERRORS_ADD:
      return { list: [...state.list, ...action.payload] };
  
    case ERRORS_CLEAR:
      return { ...initialState };  

      
    default:
      return state;
  }
};

export default{
  errors: errorsReducers,
};

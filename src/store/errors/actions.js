import {ERRORS_ADD, ERRORS_CLEAR} from './constants';

const errorsAdd = payload => ({
  type: ERRORS_ADD,
  payload
});
const errorsClear = payload => ({
  type: ERRORS_CLEAR,
  payload
});


export {
  errorsAdd,
  errorsClear,
};


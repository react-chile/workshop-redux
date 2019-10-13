import {ORDERS_GET} from './constants';
import { loadingStart, loadingFinished } from '../loading/actions';
import { errorsAdd } from '../errors/actions';


// const ordersGet = payload => ({
//   type: types.ORDERS_GET,
//   payload
// });

export const ordersGet = (payload) => {

	return async (dispatch) => {
		try{
      dispatch(loadingStart({module:'ORDERS'}));
   
    const response = await fetch('/api/orders/');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    // return body;

    const rows= body.map((item)=>{
      return { 
        Id: item.clientId,
        Nombre: item.clientName,
        Descripción: item.descrip,
        Servicio: item.servicesName,
        Ingresado: item.usersName,
        button: 'button'
      }
    });

    dispatch({ type: ORDERS_GET, payload: rows });
      // throw ('error generado');
      setTimeout( () => dispatch( loadingFinished('ORDERS') ), 2500 );
   
      // dispatch(loadingFinished({module:'ORDERS'}));



    }catch(e){
      dispatch(errorsAdd([ { error:e, module:'ORDERS' }  ]));
      dispatch(loadingFinished({module:'ORDERS'}));
    }
  };
};

export default {
  ordersGet
};


import React, { Component, Fragment } from 'react';
// import { Link } from 'react-router-dom';

import Breadcrumb from '../../common/breadcrumb/Breadcrumb';
import style from './OrdersDetail.module.css';

const dataBreadcrumb = [
  { 'name': 'Ordenes', 'url': '/orders','isSelected':false },
  { 'name': 'Detalle', 'url': '/ordersDetail','isSelected':true },
];

class OrdersDetail extends Component {

  // const { location:{ query } }= this.props;

  constructor(props) {
    super(props)
    console.log(props)
      this.state = { 
        isEdit:false,
     
     // Solución a problema de falta de data 
     isLoaded : props.location.hasOwnProperty('query'), 
     Id: props.location.hasOwnProperty('query')? props.location.query.Id : props.match.params.number, 
     Nombre: props.location.hasOwnProperty('query')? props.location.query.Nombre : '', 
     Descripción: props.location.hasOwnProperty('query')? props.location.query.Descripción : '',
     Servicio: props.location.hasOwnProperty('query')? props.location.query.Servicio : '',
     Ingresado: props.location.hasOwnProperty('query')? props.location.query.Ingresado : '',
     routeReturn: props.location.hasOwnProperty('query')? props.location.query.routeReturn : '',
    }
  };

componentDidMount() {

  // Solución a problema de falta de data 
  if( !this.state.isLoaded) this.callApi();
  
}


// Solución a problema de falta de data 
callApi = async () => {
  const response = await fetch(`/api/orders/`);
  const body = await response.json();

  if (response.status !== 200) throw Error(body.message);

  const rows= body
    .find( (item) => { return item.clientId === this.state.Id } )

  const dataNew={
      Id: rows.clientId,
      Nombre: rows.clientName,
      Descripción: rows.descrip,
      Servicio: rows.servicesName,
      Ingresado: rows.usersName,
  }

  console.log('<rows>',rows)
  this.setState({...dataNew});
  
};

  changeStatus=()=>{
    const status = !this.state.isEdit;
    
    this.setState({ 
      isEdit: status
    });
  }

  render() {
    const { location:{ query } }= this.props;
    const { Id, Nombre, Descripción,Servicio,Ingresado, routeReturn } = {...query};
    
    // Solución a problema de falta de data 
    // const {Id, Nombre, Descripción,Servicio,Ingresado, routeReturn} = this.state;

    return (
      <Fragment>
        {/* 
        <code>state: {JSON.stringify(this.state.nombre)}</code>
        <code>Existe: {this.state.isLoaded.toString()}</code> 
        */}
        <Breadcrumb data={dataBreadcrumb}/>
          <section className="hero is-dark">
            <div className="hero-body">
              <div className="container">
                <h1 className="title">Detalle Orden</h1>
                <h2 className="subtitle">Nº{Id}</h2>

              </div>
            </div>
          </section>

          <div className="card">
            <div className="card-content">
              <div className="media">
                <div className="media-content">
                  <p className="title is-4">CLIENTE: {Nombre}</p>
                  <p className="subtitle is-6">{}</p>
                </div>
            </div>

            <div className="content">
              <br/><b>TAREA:</b> 
              <br/> 
              {
                this.state.isEdit ? 
                  <input className="input" type="text" placeholder="Text input" value={Descripción}/>
                  : Descripción
              }
              <br/><b>SERVICIO:</b> 
              <br/>
              {
                this.state.isEdit ? 
                  <input className="input" type="text" placeholder="Text input" value={Servicio}/>
                  : Servicio
              }
              <br/><b>Solicitado por :</b>
              <br/>
              {
                this.state.isEdit ? 
                  <input className="input" type="text" placeholder="Text input" value={Ingresado}/>
                  : Ingresado
              }
              <br/>
              
              
              <br/><br/>
              {/* <Link  
                to={routeReturn}
                className={`button is-primary ${style.button}`} 
                >Volver
              </Link> */}
              {
                this.state.isEdit ? 
                  <a className={`button is-link ${style.button}`} onClick={this.changeStatus}>Salir</a>
                  : <a className={`button is-dark ${style.button}`} onClick={this.changeStatus}>Editar</a>
              }

              
              {/* <a className={`button is-danger ${style.button}`}>Eliminar</a> */}
            
              </div>
            </div>
          </div>

      </Fragment>
    );
  }
}

export default OrdersDetail;

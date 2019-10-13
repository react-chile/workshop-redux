import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import {ordersGet} from '../../../store/orders/actions';

import { css } from '@emotion/core';
import PacmanLoader from 'react-spinners/PacmanLoader';


import Breadcrumb from '../../common/breadcrumb/Breadcrumb';
import WelcomeBox from '../../common/welcomeBox/WelcomeBox';
import Table from '../../common/table/table';
import CardEvents from '../../common/cardEvents/CardEvents';

const dataBreadcrumb = [
  { 'name': 'Ordenes', 'url': '/orders','isSelected':true },
];


const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
  position: fixed;

    z-index: 1000;
    background: #ECF0F3;
    left: 0%;
    
    top: 0px;
    height: 100%;
    width: 100%;
   
    transition:all .3s ease;
    opacity: 0.8;

`;


class Orders extends Component {
  state = {
    dataRows: [],
    dataColumns: ['Id', 'Nombre', 'Descripción', 'Servicio','Ingresado','button'],
    totalRecords: 0,
  };

  componentDidMount() {

    const {ordersGet} = this.props;
    ordersGet();
  }

  render() {
    const {dataColumns, dataRows, totalRecords, routeReturn} = this.state;
    const {loading, orders: {list} } = this.props;

    return (
      <Fragment>
        <code>{JSON.stringify(list)}</code>
         <PacmanLoader
          css={override}
          sizeUnit={"px"}
          size={150}
          color={'red'}
          loading={loading.fetching}
        />
        <div className="columns">
          <div className="column is-12">
            
            <Breadcrumb data={dataBreadcrumb}/>
            <WelcomeBox
              title='Ordenes de trabajo recibidas'
              subTitle=''
              color='is-primary'
            />

            <div className="columns">
              <div className="column is-12">
                  
                  <CardEvents totalRecords={totalRecords}>
                      <Table 
                        dataColumns={dataColumns} 
                        dataRows={list}
                        routeReturn={'/orders'}  
                      />
                  </CardEvents>
              
              </div>
            </div>
           

            
          </div>
        </div>
            
      </Fragment>
    );
  }
}


const mapStateToProps = state => {
  return {
      loading: state.loading,
      orders: state.orders
  }
};

export const mapDispatchToProps = (dispatch) => ({
  ordersGet: (payload) => dispatch(ordersGet( payload )),
  // loadingFinished: (payload) => dispatch(loadingFinished( payload )),
  

});
// export default Orders;
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Orders) ;
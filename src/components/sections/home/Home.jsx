import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { css } from '@emotion/core';
import PacmanLoader from 'react-spinners/PacmanLoader';

import { 
  loadingStart,
  loadingFinished
} from '../../../store/loading/actions';

import Breadcrumb from '../../common/breadcrumb/Breadcrumb';
import WelcomeBox from '../../common/welcomeBox/WelcomeBox';
import InfoDashboard from '../../common/infoDashboard/infoDashboard';
import Table from '../../common/table/table';
import CardEvents from '../../common/cardEvents/CardEvents';

const dataBreadcrumb = [
    { 'name': 'Dashboard', 'url': '/', 'isSelected':true, },
  ];

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
  position: fixed;

    z-index: 1;
    background: #ECF0F3;
    left: 0px;
    top: 0px;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition:all .3s ease;
    opacity: 0.8;

`;

class Home extends Component {
  state = {
    dataRows: [],
    dataColumns: [],
    totalOrders: 0,
    totalServices:0
  };

  componentDidMount() {
    this.callApiServices();
    this.callApi();

    this.getLocalStorage();

    
  }

  getLocalStorage=()=>{
    if (typeof(Storage) !== 'undefined') {
     
      const dataRows = localStorage.getItem('dataRows');
      const dataColumns = localStorage.getItem('dataColumns');
      const totalOrders= localStorage.getItem('totalOrders');
      const totalServices = localStorage.getItem('totalServices');

      this.setState({ 
        dataRows: JSON.parse(dataRows), 
        dataColumns: JSON.parse(dataColumns), 
        totalOrders: JSON.parse(totalOrders),
        totalServices: JSON.parse(totalServices)
      });

    }
  };

  setLocalStorage=(name, value)=>{
    

    if (typeof(Storage) !== 'undefined') {
    
      localStorage.setItem(name, value);
      localStorage.Workshop = 'React-Chile';

    }
  };


  callApi = async () => {
    const response = await fetch('/api/orders/');
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);
    const count= _.countBy(body,{});

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
    const columns = ['Id', 'Nombre', 'Descripción', 'Servicio','Ingresado','button']

    this.setState({ 
      dataRows: rows, 
      dataColumns: columns, 
      totalOrders: count.true,
    });
    this.setLocalStorage('dataRows', JSON.stringify(rows));
    this.setLocalStorage('dataColumns', JSON.stringify(columns));
    this.setLocalStorage('totalOrders', count.true);
  };

  callApiServices = async() =>{
    const response = await fetch('/api/services/');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    const count= _.countBy(body,{});
    this.setState({ 
      totalServices: count.true 
    });
    this.setLocalStorage('totalServices', count.true);
    return body;
  };

  actionInit= () => {
    const { loadingStart } = this.props;
    loadingStart({module:'HOME'});
  };
  actionFinish= () => {
    const { loadingFinished } = this.props;
    loadingFinished({module:'HOME'});
  };
 
  render() {
    const {dataColumns, dataRows, totalOrders, totalServices} = this.state;
    const { loading } = this.props;
// console.log(this.state)
    return (
        <Fragment>
        <code style={{zIndex: '1000'}}>{JSON.stringify(loading)}</code>
        <a style={{zIndex: '1000'}} className={`button is-link `} onClick={this.actionInit}>Iniciar</a> <span> </span>
        <a style={{zIndex: '1000'}} className={`button is-link `} onClick={this.actionFinish}>Finalizar</a>
        
        { loading.fetching ?
        <PacmanLoader
          css={override}
          sizeUnit={"px"}
          size={150}
          color={'red'}
          loading={this.state.loading}
        />
        :null
        }

        <div className="columns">
          <div className="column is-12">
            
            <Breadcrumb data={dataBreadcrumb}/>
            
            <WelcomeBox
              title='Bienvenido Juanin Jan Jarri'
              subTitle='Que tengas un excelente día!'
            />

            <section className="info-tiles">
              <div className="tile is-ancestor has-text-centered">

                <InfoDashboard 
                  title={totalOrders}
                  subTitle="Ordenes abiertas"
                />
                <InfoDashboard 
                  title={totalServices}
                  subTitle="Servicios"
                />
              
              </div>
            </section>

            
          </div>
        </div>
            
        <div className="columns">
            <div className="column is-12">
                
              <CardEvents totalOrders={totalOrders}>
                <Table 
                  dataColumns={dataColumns} 
                  dataRows={dataRows}
                  routeReturn={'/'}  
                />
              </CardEvents>
            
            </div>
        </div>
        </Fragment>
  
  
    );
  }
}

// export default Home;
const mapStateToProps = state => {
  return {
      loading: state.loading
  }
};

export const mapDispatchToProps = (dispatch) => ({
  loadingStart: (payload) => dispatch(loadingStart( payload )),
  loadingFinished: (payload) => dispatch(loadingFinished( payload )),
  

});
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Home) ;
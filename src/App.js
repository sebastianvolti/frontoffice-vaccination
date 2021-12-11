import React, { Component } from 'react';
import NavBar from './components/NavBar'
import HomeContainer from './containers/HomeContainer';
import AuthCallback from './containers/AuthCallback';
import LogoutCallback from './containers/LogoutCallback';
import ReservationContainer from './containers/ReservationContainer';
import MonitorContainer from './containers/MonitorContainer';
import ConfirmationContainer from './containers/ConfirmationContainer';
import MobileContainer from './containers/MobileContainer';
import SolicitudesContainer from './containers/SolicitudesContainer';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

import {BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';

// Redux
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux";

class App extends Component {

  render() {
    return (
      <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Router>
            <div>
                <NavBar></NavBar>
      			<Route exact path="/" component={HomeContainer}/>
                <Route exact path="/inicio" component={HomeContainer}/>
                <Route exact path="/home" component={LogoutCallback}/>
                <Route exact path="/reservation" component={ReservationContainer}/>
                <Route exact path="/confirmation" component={ConfirmationContainer}/>
                <Route exact path="/mobile" component={MobileContainer}/>
                <Route exact path="/callback" component={AuthCallback}/>
                <Route exact path="/monitor" component={MonitorContainer}/>
                <Route exact path="/solicitudes" component={SolicitudesContainer}/>
              </div>      
            </Router>
          </PersistGate>
          <ToastContainer />
    </Provider>
    
    );
  }
 
}

export default App;

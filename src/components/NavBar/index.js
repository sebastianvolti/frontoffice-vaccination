import React from "react";
import { withRouter } from 'react-router-dom';

// Redux
import { connect } from "react-redux";
import { AG_AUTH_URL_CIUDADANO, AG_AUTH_URL_VACUNADOR, AG_AUTH_URL_MOVIL } from "./../../constants";
import Button from '@material-ui/core/Button';
import { CleanCookie, Logout } from "./../../services/auth";
import { updateAuthData } from "../../redux/actions";
import { flush } from "../../redux/index";

// Style
import "./style.css";


function NavBar({ auth, history, update }) {

  const handleLogout =
    async () => {
      try {
        const { data } = await Logout();
        window.location.replace(data);
      } catch (error) {
        console.warn(error);
      }
    };


  const handleOnClick = () => {
    window.location.replace(AG_AUTH_URL_CIUDADANO);
  } 

  const handleReservation = () => {
    history.replace("/reservation")
  }  

  const handleSolicitudes = () => {
    history.replace("/solicitudes")
  }  

  const handleMonitor = () => {
    history.replace("/monitor")
  }  


  if (auth.data == null) {
    return (
      <nav className="nav-bar">
        <div>
          <h2>Bienvenido al Portal de Vacunación</h2>
        </div>
        <Button onClick={handleMonitor}>Monitor Vacunacion</Button>
        <Button onClick={handleOnClick}>Iniciar Sesion</Button>
      </nav>
    );
  }
  else {
    return (
      <nav className="nav-bar">
        <div>
          <h2>Bienvenido al Portal de Vacunación</h2>
        </div>
        <Button onClick={handleSolicitudes}>Mis Solicitudes</Button>
        <Button onClick={handleReservation}>Reservar Hora</Button>
        <Button onClick={handleLogout}>Cerrar Sesión</Button>
      </nav>
    );
  }
}


function mapStateToProps({ auth }) {
  return { auth };
}

function mapDispatchToProps(dispatch) {
  return {
    update: payload => dispatch(updateAuthData(payload))
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar));

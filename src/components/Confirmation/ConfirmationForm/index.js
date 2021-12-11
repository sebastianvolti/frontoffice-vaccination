import React, { useState,  memo } from "react";
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import Grid from '@material-ui/core/Grid';
import TextField from "@material-ui/core/TextField";
import Button from '@material-ui/core/Button';

import { UserConfirmation } from '../../../services/auth.js'

import "./style.css";

function ConfirmationForm({ auth, history }) {

  const cedula = (auth.data) ? getCiFromUid(auth.data.uid) : null;
  const email = (auth.data) ? auth.data.email : null;
  const name = (auth.data) ? auth.data.primer_nombre : null;
  const lastName = (auth.data) ? auth.data.primer_apellido : null;
  const secondLastName = (auth.data) ? auth.data.segundo_apellido : null;

  const hanldeConfirmarClick = (event) => {
    const confirmation = {
      userId: cedula,
      userName: name,
      userLastName: lastName + " " + secondLastName,
      userEmail: email
    }
   
    UserConfirmation(confirmation)
    .then(() => console.log("User Confirmation!"))
    .catch(error => console.log(error));
    history.replace("/inicio");

  }

  console.log(auth);
  return (
    <div className="confirmation-form-layout">
     <div className="confirmation-form-title app-subh">
        <h3>Confirmación de datos personales</h3>
     </div> 
     <div className="confirmation-form-body">

       <Grid container spacing={3}>
          <Grid item xs={3}>
              <TextField disabled id="input-cedula" label="Cedula" variant="filled" defaultValue={cedula} className="confirmation-input-text"/>
          </Grid>
          <Grid item xs={3}>
              <TextField  id="input-email" label="Correo Electronico" defaultValue={email} className="confirmation-input-text"/>
          </Grid>
      </Grid>

       <Grid container spacing={3}>
          <Grid item xs={3}>
              <TextField  id="input-name1" label="Primer Nombre" defaultValue={name} className="confirmation-input-text"/>
          </Grid>
          <Grid item xs={3}>
              <TextField  id="input-name2" label="Segundo Nombre" className="confirmation-input-text"/>
          </Grid>
      </Grid>

       <Grid container spacing={3}>
          <Grid item xs={3}>
              <TextField  id="input-last1" label="Primer Apellido" defaultValue={lastName} className="confirmation-input-text"/>
          </Grid>
          <Grid item xs={3}>
              <TextField  id="input-last2" label="Segundo Apellido" defaultValue={secondLastName} className="confirmation-input-text"/>
          </Grid>
      </Grid>
      <Button onClick={hanldeConfirmarClick} variant="contained" color="primary" className="btn-confirmar">
          CONFIRMAR
      </Button>

     </div> 
    </div>
  );
}

function getCiFromUid(uid){
  return uid.split("-")[2];
}


function mapStateToProps({ auth }) {
  return { auth };
}


export default withRouter(connect(mapStateToProps, null)(ConfirmationForm));

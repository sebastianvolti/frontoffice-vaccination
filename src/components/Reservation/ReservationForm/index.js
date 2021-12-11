import React, { useState,  memo, useEffect } from "react";

import { connect } from "react-redux";
import Grid from '@material-ui/core/Grid';
import TextField from "@material-ui/core/TextField";
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

import { toast } from 'react-toastify';


import SelectorDepartamento from '../../composite/SelectorDepartamento';

import SelectorVacunatorio from '../../composite/SelectorVacunatorio';

import { NuevaSolicitud } from '../../../services/reservas.js'

import { GetEnfermedades } from '../../../services/backoffice.js'


import "./style.css";

function ReservationForm({ auth, history }) {
  const cedula = (auth.data) ? getCiFromUid(auth.data.uid) : null;
  const email = (auth.data) ? auth.data.email : null;
  const [horario, setHorario] = useState("");

  const handleHorarioChange = (event) => {
    setHorario(event.target.value);
  }

  const [vacunatorio, setVacunatorio] = useState(0);

  const [departamento, setDepartamento] = useState("");

  const [enfermedad, setEnfermedad] = useState("");

  const [enfermedades, setEnfermedades] = useState([]);

  useEffect(() => {  
    console.log("loading enfermedades");  
    GetEnfermedades()
    .then((response) => {
      console.log(response.data);
      setEnfermedades(response.data);
    });    
    
  }, [])

  const handleEnfermedadChange = (event) => {
    setEnfermedad(event.target.value);
  }

  const hanldeConfirmarClick = (event) => {
    const solicitud = {
      idAgenda: enfermedad,
      ci: cedula,
      email: email,
      departamento: departamento,
      idVacunatorio: vacunatorio,
      horario: horario
    }

    NuevaSolicitud(solicitud)
    .then(() => toast.success("Solicitud creada con éxito!"))
    .catch(error => {
      console.log(error);
      toast.error("Ocurrió un error al crear la solicitud.");
    });
  }

  console.log(auth);
  return (
    <div className="reservation-form-layout">
     <div className="reservation-form-title app-subh">
     <h3>Formulario de solicitud de vacunación</h3>
     </div> 
     <div className="reservation-form-body">

     <Grid container spacing={3}>
          <Grid item md={4} sm={12}>
              <TextField disabled id="input-cedula" label="Cedula" variant="filled" defaultValue={cedula} className="reservation-input-text"/>
          </Grid>
          <Grid item md={4} sm={12}>
              <TextField disabled id="input-email" label="Correo Electronico" variant="filled" defaultValue={email} className="reservation-input-text"/>
          </Grid>
      </Grid>


      <Grid container spacing={3}>
          <Grid item md={4} sm={12}>
              <FormControl className="reservation-input-text">
            <InputLabel htmlFor="reservation-form-enfermedad">Enfermedad</InputLabel>
            <Select          
              value={enfermedad}
              onChange={handleEnfermedadChange}
              inputProps={{
                name: 'enfermedad',
                id: 'reservation-form-enfermedad',
              }}
            >
              {
                enfermedades.map((enf) => 
                  <MenuItem value={enf.id}>{enf.nombre}</MenuItem>
                )
              }
            </Select>
          </FormControl>
          </Grid>

          <Grid item md={4} sm={12}>
            <FormControl className="reservation-input-text">
              <InputLabel htmlFor="reservation-form-horario">Horario</InputLabel>
              <Select          
                value={horario}
                onChange={handleHorarioChange}
                inputProps={{
                  name: 'horario',
                  id: 'reservation-form-horario',
                }}
              >
                <MenuItem value={"MATUTINO"}>8hs a 14hs</MenuItem>
                <MenuItem value={"VESPERTINO"}>14hs a 22hs</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
      </Grid>


      <Grid container spacing={3}>
          <Grid item md={4} sm={12}>
              <SelectorDepartamento departamento={departamento} setDepartamento={setDepartamento} /> 
          </Grid>

          <Grid item md={4} sm={12}>
            <SelectorVacunatorio departamento={departamento} vacunatorio={vacunatorio} setVacunatorio={setVacunatorio} /> 
          </Grid>
      </Grid>
    
      <Button onClick={hanldeConfirmarClick} variant="contained" color="primary" className="btn-confirmar-solicitud">
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


export default memo(connect(mapStateToProps, null)(ReservationForm));
